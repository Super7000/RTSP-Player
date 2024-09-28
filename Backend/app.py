import os
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/livestream_app"
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
mongo = PyMongo(app)

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Configure CORS to allow all origins
CORS(app, resources={r"/api/*": {"origins": "*"}})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'filename': filename}), 200
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# CRUD operations for overlays
@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays = mongo.db.overlays.find()
    return jsonify([{**overlay, '_id': str(overlay['_id'])} for overlay in overlays])

@app.route('/api/overlays/<id>', methods=['GET'])
def get_overlay(id):
    overlay = mongo.db.overlays.find_one({'_id': ObjectId(id)})
    if overlay:
        overlay['_id'] = str(overlay['_id'])
        return jsonify(overlay)
    return jsonify({'error': 'Overlay not found'}), 404

@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    new_overlay = request.json
    if 'image' in new_overlay:
        # Ensure the image file exists
        if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], new_overlay['image'])):
            return jsonify({'error': 'Image file not found'}), 400
    result = mongo.db.overlays.insert_one(new_overlay)
    return jsonify({'_id': str(result.inserted_id)}), 201

@app.route('/api/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        updated_overlay = request.json
        updated_overlay.pop('_id', None)
        if 'image' in updated_overlay:
            # Ensure the image file exists
            if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], updated_overlay['image'])):
                return jsonify({'error': 'Image file not found'}), 400
        result = mongo.db.overlays.update_one({'_id': ObjectId(id)}, {'$set': updated_overlay})
        if result.modified_count:
            return jsonify({'message': 'Overlay updated successfully'})
        return jsonify({'error': 'Overlay not found'}), 404
    except Exception as e:
        app.logger.error(f"Error updating overlay: {str(e)}")
        return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500

@app.route('/api/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    result = mongo.db.overlays.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return jsonify({'message': 'Overlay deleted successfully'})
    return jsonify({'error': 'Overlay not found'}), 404

@app.route('/api/rtsp_url', methods=['GET'])
def get_rtsp_url():
    return jsonify({'rtsp_url': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'})

if __name__ == '__main__':
    app.run(debug=True)