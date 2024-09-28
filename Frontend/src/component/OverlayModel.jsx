import React, { useState } from 'react'
import { createOverlay } from '../services/services';
import "../style/OverlayModel.css"

function OverlayModel({ onClose, onAdd }) {
    const [newOverlay, setNewOverlay] = useState({ content: '', x: 0, y: 0, width: 100, height: 100 });

    return (
        <>
            <div className='overlay-model'>
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
                    await onAdd();
                    onClose();
                }}>Add Overlay</button>
            </div>
            <div className='overlay-model-bg'>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px'
                }}>Close</button>
            </div>
        </>
    )
}

export default OverlayModel