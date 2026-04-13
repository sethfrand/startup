import React, {useEffect, useState} from 'react';
import './sheets.css';
import {useNavigate} from "react-router-dom";

export default function Sheets(props) {
    const [sheets, setSheets] = useState([]);
    const [sharingId, setSharingId] = useState(null);
    const [shareUsername, setShareUsername] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function loadSheets() {
            const response = await fetch('/api/sheets', {
                credentials: 'include',
            });
            if (response?.status === 200) {
                const data = await response.json();
                if (data.length === 0) {
                    handleCreateSheet('1st Sheet')
                } else {
                    setSheets(data);
                }
            }
        }

        loadSheets();
    }, []);

    async function handleCreateSheet(name = 'New Sheet') {
        const response = await fetch('/api/sheets', {
            method: 'post',
            body: JSON.stringify({name: name, owner: props.username}),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include',
        });
        if (response?.status === 200) {
            const newSheet = await response.json();
            const updatedSheets = [...sheets, newSheet];
            setSheets(updatedSheets);
            localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
        } else {

        }
    }

    async function handleRenameSheet(id, newName) {
        console.log('renaming sheet with id:', id, typeof id);
        const response = await fetch(`/api/sheets/${id}/rename`, {
            method: 'post',
            body: JSON.stringify({name: newName}),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include',
        });
        console.log('response status:', response.status);
        const text = await response.text();
        console.log('response body:', text);
        if (response?.status === 200) {
            const updatedSheets = sheets.map(sheet =>
                sheet.id === id ? {...sheet, name: newName} : sheet
            );
            setSheets(updatedSheets);
            localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
        }
    }

    async function handleDeleteSheet(id) {
        const response = await fetch(`/api/sheets/${id}`, {
            method: 'delete',
            credentials: 'include',
        });
        if (response?.status === 204) {

        const updatedSheets = sheets.filter(sheet => sheet.id !== id);
        setSheets(updatedSheets);
        localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
    }
    }

    async function handleShareSheet(id) {
        const response = await fetch(`/api/sheets/${id}/share`, {
            method: 'post',
            body: JSON.stringify({targetEmail: shareUsername}),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            credentials: 'include',
        });
        if (response?.status === 200) {
            props.socketRef.current?.send(JSON.stringify({
                message: `${props.username} shared a sheet with you`
            }));
            setSharingId(null);
            setShareUsername('');
        } else {
            alert('User not found or sharing failed.');
        }
    }


    function handleEditSheet(id) {
        localStorage.setItem('currentSheet', id)
        props.setCurrentSheet(id)
        navigate('/Expenses');
    }

    return (
        <main>
            <button className="btn btn-primary mb-3" onClick={() => handleCreateSheet()}>Create New Sheet</button>
            <ul className="list-unstyled">
                {sheets.map(sheet => (
                    <li key={sheet.id} className="mb-2 d-flex align-items-center gap-2">
                        <input
                            value={sheet.name}
                            onChange={(e) => handleRenameSheet(sheet.id, e.target.value)}
                        />
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSheet(sheet.id)}>Delete
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setSharingId(sheet.id)}>Share
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => handleEditSheet(sheet.id)}>Edit
                        </button>
                        {sharingId === sheet.id && (
                            <div className="d-flex gap-2">
                                <input
                                    placeholder="Enter username..."
                                    value={shareUsername}
                                    onChange={(e) => setShareUsername(e.target.value)}
                                />
                                <button className="btn btn-primary btn-sm"
                                        onClick={() => handleShareSheet(sheet.id)}>Send
                                </button>
                                <button className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setSharingId(null)}>Cancel
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}