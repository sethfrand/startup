import React, { useState, useEffect } from 'react';
import './sheets.css';

export default function Sheets(props) {
    const [sheets, setSheets] = useState([]);
    const [sharingId, setSharingId] = useState(null);
    const [shareUsername, setShareUsername] = useState('');

    useEffect(() => {
        const storedSheets = JSON.parse(localStorage.getItem(`sheets_${props.username}`));
        if (storedSheets) setSheets(storedSheets);
    }, []);

    function handleCreateSheet() {
        const updatedSheets = [...sheets, {
            id: Date.now(),
            name: 'New Sheet',
            owner: props.username,
            sharedWith: []
        }];
        setSheets(updatedSheets);
        localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
    }

    function handleRenameSheet(id, newName) {
        const updatedSheets = sheets.map(sheet =>
            sheet.id === id ? { ...sheet, name: newName } : sheet
        );
        setSheets(updatedSheets);
        localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
    }

    function handleDeleteSheet(id) {
        const updatedSheets = sheets.filter(sheet => sheet.id !== id);
        setSheets(updatedSheets);
        localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
    }

    function handleShareSheet(id) {
        const targetUser = localStorage.getItem(`password_${shareUsername}`);
        if (!targetUser) {
            alert('User does not exist!');
            return;
        }
        const sheetToShare = sheets.find(sheet => sheet.id === id);
        const theirSheets = JSON.parse(localStorage.getItem(`sheets_${shareUsername}`)) || [];
        const alreadyShared = theirSheets.some(s => s.id === id);
        if (!alreadyShared) {
            const updatedTheirSheets = [...theirSheets, { ...sheetToShare, sharedWith: [] }];
            localStorage.setItem(`sheets_${shareUsername}`, JSON.stringify(updatedTheirSheets));
        }
        setSharingId(null);
        setShareUsername('');
    }

    return (
        <main>
            <button className="btn btn-primary mb-3" onClick={handleCreateSheet}>Create New Sheet</button>
            <ul className="list-unstyled">
                {sheets.map(sheet => (
                    <li key={sheet.id} className="mb-2 d-flex align-items-center gap-2">
                        <input
                            value={sheet.name}
                            onChange={(e) => handleRenameSheet(sheet.id, e.target.value)}
                        />
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSheet(sheet.id)}>Delete</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setSharingId(sheet.id)}>Share</button>
                        {sharingId === sheet.id && (
                            <div className="d-flex gap-2">
                                <input
                                    placeholder="Enter username..."
                                    value={shareUsername}
                                    onChange={(e) => setShareUsername(e.target.value)}
                                />
                                <button className="btn btn-primary btn-sm" onClick={() => handleShareSheet(sheet.id)}>Send</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => setSharingId(null)}>Cancel</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}