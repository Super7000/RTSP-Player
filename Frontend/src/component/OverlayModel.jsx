import React, { useState } from 'react'
import { createOverlay } from '../services/services';
import "../style/OverlayModel.css"

function OverlayModel({ onClose, onAdd }) {
    const [newOverlay, setNewOverlay] = useState({ content: '', x: 0, y: 0, width: 100, height: 100, transparancy: 0.5 });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    return (
        <>
            <div className='overlay-model'>
                <input
                    type="text"
                    value={newOverlay.content}
                    onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
                    placeholder="Overlay content"
                />
                Position:
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
                Size:
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
                Transparancy:
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={newOverlay.transparancy}
                    onChange={(e) => setNewOverlay({ ...newOverlay, transparancy: e.target.value })}
                />
                <input type="file" onChange={handleFileSelect} />
                <button onClick={async () => {
                    await createOverlay(newOverlay, selectedFile);
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