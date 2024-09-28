# Livestream App User Documentation

## Setting Up the App

1. Ensure you have Python, Node.js, and MongoDB installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the backend directory and install Python dependencies:
   ```
   pip install flask flask_pymongo flask_cors
   ```
4. Navigate to the frontend directory and install Node.js dependencies:
   ```
   npm install
   ```
5. Start MongoDB service on your machine.

## Running the App

1. Start the backend server:
   - Navigate to the backend directory
   - Run `python app.py`
   - The server should start on `http://localhost:5000`

2. Start the frontend development server:
   - Navigate to the frontend directory
   - Run `npm start`
   - The React app should open in your default browser at `http://localhost:3000`

## Using the App

### Viewing the Livestream

1. The livestream should automatically start playing when you open the app.
2. Use the video controls to play, pause, or adjust the volume of the livestream.

### Managing Overlays

1. To create a new overlay:
   - Click the "Add" button
   - After entering the details Click the "Add Overlay" button
   - The new overlay will appear on the video player

2. To update an existing overlay:
   - Find the overlay in the list below the video player
   - Click the "Edit" button next to the overlay
   - Enter the new content in the inputs that appears
   - The overlay will be updated on the video player

3. To delete an overlay:
   - Find the overlay in the list below the video player
   - Click the "Delete" button next to the overlay
   - The overlay will be removed from the video player

### Customizing the RTSP URL

To change the RTSP URL:
1. Open the backend code (`app.py`)
2. Locate the `get_rtsp_url` function
3. Replace the hardcoded URL with your desired RTSP stream URL
4. Restart the backend server for the changes to take effect

## Troubleshooting

- If the livestream doesn't play, ensure that the RTSP URL is correct and accessible.
- If overlays don't appear, check the browser console for any error messages and ensure the backend server is running.
- For any other issues, please check the error logs or contact the support team.




# Livestream App API Documentation

## Base URL
All endpoints are relative to: `http://localhost:5000/api`

## Endpoints

### Get RTSP URL
- **URL:** `/rtsp_url`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "rtsp_url": "rtsp://your-rtsp-stream-url-here" }`

### Get All Overlays
- **URL:** `/overlays`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of overlay objects

### Create Overlay
- **URL:** `/overlays`
- **Method:** `POST`
- **Data Params:** 
  ```json
  {
    "content": "Overlay text",
    "x": 0,
    "y": 0,
    "width": 100,
    "height": 100
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ "_id": "inserted_id" }`

### Get Single Overlay
- **URL:** `/overlays/:id`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** Overlay object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Overlay not found" }`

### Update Overlay
- **URL:** `/overlays/:id`
- **Method:** `PUT`
- **Data Params:** 
  ```json
  {
    "content": "Updated overlay text",
    "x": 10,
    "y": 10,
    "width": 150,
    "height": 150
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Overlay updated successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Overlay not found" }`

### Delete Overlay
- **URL:** `/overlays/:id`
- **Method:** `DELETE`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Overlay deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Overlay not found" }`