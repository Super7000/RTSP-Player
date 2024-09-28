import axios from "axios";

const fetchRtspUrl = async () => {
    const response = await axios.get('http://localhost:5000/api/rtsp_url');
    return response.data.rtsp_url;
};

const fetchOverlays = async () => {
    const response = await axios.get('http://localhost:5000/api/overlays');
    return response.data;
};

const createOverlay = async (overlay, file) => {
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData);
        overlay.image = uploadResponse.data.filename;
    }
    await axios.post('http://localhost:5000/api/overlays', overlay);
    return overlay
};

const updateOverlay = async (id, overlay, file) => {
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData);
        overlay.image = uploadResponse.data.filename;
    }
    await axios.put(`http://localhost:5000/api/overlays/${id}`, overlay);
    return overlay
};

const deleteOverlay = async (id) => {
    await axios.delete(`http://localhost:5000/api/overlays/${id}`);
    return id
};

export { fetchRtspUrl, fetchOverlays, createOverlay, updateOverlay, deleteOverlay };