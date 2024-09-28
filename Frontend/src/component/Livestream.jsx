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
                    style={{ borderRadius: '1rem', overflow: 'hidden' }}
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
                            background: `rgba(255, 255, 255, ${overlay.transparancy})`,
                            padding: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '0.5rem'
                        }}
                    >
                        {overlay.content}
                        {overlay.image && (
                            <>
                                <img
                                    src={`http://localhost:5000/uploads/${overlay.image}`}
                                    alt="Overlay"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Livestream;
