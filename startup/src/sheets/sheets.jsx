import React from 'react';

export default function Sheets(){
    return (
        <main>
            <button className="action button">Create new sheet</button>

            <list>
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
            </list>
        </main>
    );
}