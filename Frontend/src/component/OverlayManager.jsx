import React, { useState } from 'react';
import { createOverlay, updateOverlay } from '../services/services';
import "../style/OverlayManager.css"

const OverlayManager = ({ overlays, onChange = () => { } }) => {
    const [newOverlay, setNewOverlay] = useState({ content: '', x: 0, y: 0, width: 100, height: 100 });

    return (
        <div className='overlay-manager'>
            <div>

                <h2>Overlays</h2>
                <div className='overlay-form'>
                    <input
                        type="text"
                        value={newOverlay.content}
                        onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
                        placeholder="Overlay content"
                    />
                    <input
                        type="number"
                        value={newOverlay.y}
                        onChange={(e) => setNewOverlay({ ...newOverlay, y: e.target.value })}
                        placeholder="top"
                    />
                    <input
                        type="number"
                        value={newOverlay.x}
                        onChange={(e) => setNewOverlay({ ...newOverlay, x: e.target.value })}
                        placeholder="left"
                    />
                    <input
                        type="number"
                        value={newOverlay.width}
                        onChange={(e) => setNewOverlay({ ...newOverlay, width: e.target.value })}
                        placeholder="width"
                    />
                    <input
                        type="number"
                        value={newOverlay.height}
                        onChange={(e) => setNewOverlay({ ...newOverlay, height: e.target.value })}
                        placeholder="height"
                    />
                    <button onClick={async () => {
                        await createOverlay(newOverlay);
                        onChange();
                    }}>Add Overlay</button>
                </div>
            </div>
            <Overlays overlays={overlays} onChange={onChange} />
        </div>
    );
};

function Overlays({ overlays, onChange }) {
    return (
        <div>
            {overlays.map((overlay) => (
                <Overlay key={overlay._id} overlay={overlay} onChange={onChange} />
            ))}
        </div>
    );
}

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
                <div>
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
                <div>
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
                <>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteOverlay(overlay._id)}>Delete</button>
                </>
            )}
        </div>
    );
}

export default OverlayManager;
