import React, {useState, useEffect} from 'react';


import './sheets.css';

export default function Sheets(props){

    const [sheets, setSheets] = useState([]);
    const [sharingID, setSharingID] = useState(null);
    const [shareUsername, setShareUsername] = useState('');


    useEffect(() => {const storedSheets = JSON.parse(localStorage.getItem(`sheets_${props.username}`));
    if (storedSheets) setSheets(storedSheets);
    },[])

    function handleCreateSheet()
    {
        const updatedSheets = [...sheets,
            {
                id: Date.now(),
                name: `New Sheet`,
                owner: props.username,
                sharedWith: [],
            }];
        setSheets(updatedSheets);
        localStorage.setItem(`sheets_${props.username}`, JSON.stringify(updatedSheets));
    }


    return (
        <main>
            <button className="action button">Create new sheet</button>

            <ul>
                <li>Sheet 1 <button className="action button">Edit</button>
                    <button className="action button">Delete</button>
                    <button className="action button">Share Sheet</button>
                </li>
                <li>Sheet 1 <button className="action button">Edit</button>
                    <button className="action button">Delete</button>
                    <button className="action button">Share Sheet</button>
                </li>
                <li>Sheet 1 <button className="action button">Edit</button>
                    <button className="action button">Delete</button>
                    <button className="action button">Share Sheet</button>
                </li>
            </ul>
        </main>
    );
}