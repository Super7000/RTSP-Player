import React, { useState, useEffect } from 'react';
import Livestream from './component/Livestream';
import { fetchOverlays, fetchRtspUrl } from './services/services';
import OverlayManager from './component/OverlayManager';
import "./App.css"

const App = () => {
    const [rtspUrl, setRtspUrl] = useState('');
    const [overlays, setOverlays] = useState([]);

    useEffect(() => {
        fetchRtspUrl().then((rtspUrl) => setRtspUrl(rtspUrl));
        fetchOverlays().then((overlays) => setOverlays(overlays));
    }, []);

    return (
        <div className='app'>
            <Livestream rtspUrl={rtspUrl} overlays={overlays} />
            <OverlayManager overlays={overlays} onChange={async () => fetchOverlays().then(overlays => setOverlays(overlays))} />
        </div>
    );
};

export default App;