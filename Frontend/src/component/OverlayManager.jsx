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
    const [updatedOverlay, setUpdatedOverlay] = useState(overlay ? { ...overlay } : {
        content: "",
        x: 0, y: 0,
        width: 100, height: 100,
        transparancy: 0.5
    });

    return (
        <div className='overlay'>
            <>
                <input
                    type="text"
                    value={updatedOverlay.content}
                    onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, content: e.target.value })}
                    placeholder='Overlay content'
                    readOnly={!isEditing}
                />
                Position:
                <div className='input-grp'>
                    <input
                        type="number"
                        value={updatedOverlay.y}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, y: e.target.value })}
                        placeholder='top'
                        readOnly={!isEditing}
                    />
                    <input
                        type="number"
                        value={updatedOverlay.x}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, x: e.target.value })}
                        placeholder='left'
                        readOnly={!isEditing}
                    />
                </div>
                Size:
                <div className='input-grp'>
                    <input
                        type="number"
                        value={updatedOverlay.width}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, width: e.target.value })}
                        placeholder='width'
                        readOnly={!isEditing}
                    />
                    <input
                        type="number"
                        value={updatedOverlay.height}
                        onChange={(e) => setUpdatedOverlay({ ...updatedOverlay, height: e.target.value })}
                        placeholder='height'
                        readOnly={!isEditing}
                    />
                </div>
                Transparancy:
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={updatedOverlay.transparancy}
                    onChange={(e) => isEditing ? setUpdatedOverlay({ ...updatedOverlay, transparancy: e.target.value }) : ""}
                    readOnly={!isEditing}
                />
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
