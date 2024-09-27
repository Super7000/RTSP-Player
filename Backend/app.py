from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/livestream_app"
mongo = PyMongo(app)

# Configure CORS to allow all origins
CORS(app, resources={r"/api/*": {"origins": "*"}})

# CRUD operations for overlays
@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays = mongo.db.overlays.find()
    return jsonify([{**overlay, '_id': str(overlay['_id'])} for overlay in overlays])

@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    new_overlay = request.json
    result = mongo.db.overlays.insert_one(new_overlay)
    return jsonify({'_id': str(result.inserted_id)}), 201

@app.route('/api/overlays/<id>', methods=['GET'])
def get_overlay(id):
    overlay = mongo.db.overlays.find_one({'_id': ObjectId(id)})
    if overlay:
        overlay['_id'] = str(overlay['_id'])
        return jsonify(overlay)
    return jsonify({'error': 'Overlay not found'}), 404

@app.route('/api/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        updated_overlay = request.json
        # Remove '_id' from the update data if it exists
        updated_overlay.pop('_id', None)
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
    return jsonify({'rtsp_url': 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4'})

if __name__ == '__main__':
    app.run(debug=True)