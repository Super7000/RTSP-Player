import React from 'react';
import ReactPlayer from 'react-player';

const Livestream = ({ rtspUrl, overlays = [] }) => {
    return (
        <>
            <h1>Livestream App</h1>
            <div style={{ position: 'relative', width: '640px', height: '360px' }}>
                <ReactPlayer
                    url={rtspUrl}
                    playing
                    controls
                    width="640px"
                    height="360px"
                />
                {overlays.map((overlay) => (
                    <div
                        key={overlay._id}
                        style={{
                            position: 'absolute',
                            left: `${overlay.x}px`,
                            top: `${overlay.y}px`,
                            width: `${overlay.width}px`,
                            height: `${overlay.height}px`,
                            background: 'rgba(255, 255, 255, 0.5)',
                            padding: '5px',
                        }}
                    >
                        {overlay.content}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Livestream;
