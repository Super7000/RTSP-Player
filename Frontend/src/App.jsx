import React, { useState, useEffect } from 'react';
import Livestream from './component/Livestream';
import { fetchOverlays, fetchRtspUrl } from './services/services';
import OverlayManager from './component/OverlayManager';
import "./App.css"
import OverlayModel from './component/OverlayModel';

const App = () => {
    const [rtspUrl, setRtspUrl] = useState('');
    const [overlays, setOverlays] = useState([]);
    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        fetchRtspUrl().then((rtspUrl) => setRtspUrl(rtspUrl));
        fetchOverlays().then((overlays) => setOverlays(overlays));
    }, []);

    async function downloadOverlays() {
        fetchOverlays().then((overlays) => setOverlays(overlays));
    }

    return (
        <div className='app'>
            {showModel && <OverlayModel onClose={() => setShowModel(false)} onAdd={downloadOverlays} />}
            <Livestream rtspUrl={rtspUrl} overlays={overlays} />
            <OverlayManager overlays={overlays} onChange={downloadOverlays} />
            <button className='add-overlay-btn' onClick={() => setShowModel(true)}>Add</button>
        </div>
    );
};

export default App;