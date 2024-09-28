import React, { useState } from 'react';
import { deleteOverlay, updateOverlay } from '../services/services';
import "../style/OverlayManager.css"

const OverlayManager = ({ overlays, onChange = () => { } }) => {
    return (
        <div className='overlays-container'>
            {overlays.map((overlay) => (
                <Overlay key={overlay._id} overlay={overlay} onChange={onChange} />
            ))}
        </div>
    );
};

function Overlay({ overlay, onChange = () => { } }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedOverlay, setUpdatedOverlay] = useState({ ...overlay });

    return (
        <div className='overlay'>
            <>
                <input
                    type="text"
                    value={updatedOverlay.content}
                    onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, content: e.target.value })}
                    readOnly={!isEditing}
                />
                <div className='input-grp'>
                    <input
                        type="number"
                        value={updatedOverlay.y}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, y: e.target.value })}
                        readOnly={!isEditing}
                    />
                    <input
                        type="number"
                        value={updatedOverlay.x}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, x: e.target.value })}
                        readOnly={!isEditing}
                    />
                </div>
                <div className='input-grp'>
                    <input
                        type="number"
                        value={updatedOverlay.width}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, width: e.target.value })}
                        readOnly={!isEditing}
                    />
                    <input
                        type="number"
                        value={updatedOverlay.height}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, height: e.target.value })}
                        readOnly={!isEditing}
                    />
                </div>
            </>

            {isEditing ? (
                <button onClick={() => {
                    setIsEditing(false);
                    updateOverlay(updatedOverlay._id, updatedOverlay).then(() => onChange());
                }}>Save</button>
            ) : (
                <div className='input-grp btn-grp'>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => {
                        deleteOverlay(overlay._id).then(() => onChange())
                    }}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default OverlayManager;
