import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { FaBell } from 'react-icons/fa';


import {Routes, Route, NavLink, BrowserRouter} from "react-router-dom";
import Overview from './overview/overview';
import Expenses from './expenses/expenses';
import Sheets from './sheets/sheets';
import Login from './login/login';


export default function App() {
    const [username, setUsername] = useState(localStorage.getItem('userName') || '');
    const [currentSheet, setCurrentSheet] = useState(localStorage.getItem('currentSheet') || null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const mockedNotifications = [
        `${username} has added a new expense to ${currentSheet.name}`,
        `${username} shared a sheet with you`,
    ]

    useEffect(() => {
        if (!username) return;
        const interval = setInterval(() => {
            const RandomNotification = mockedNotifications[Math.floor(Math.random() * mockedNotifications.length)]
            setNotifications(prevState => [...prevState, RandomNotification])
        },5000)
        return () => clearInterval(interval);},[username, currentSheet])

    function handleLogout() {
        setUsername('');
        window.location.href = '/'

    }

    return (
    <BrowserRouter>
    <div>
        <header>
        <h1 className="nav-item"><NavLink className="nav-link" to="/">Finance Sheet</NavLink></h1>
            {username !== '' && <nav>
                <ul>
                    <li className="nav-item"><NavLink className="nav-link" to="Overview">Overview</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="Expenses">Expenses</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="Sheets">All Sheets</NavLink></li>
                </ul>
            </nav>}
            {username !== '' && (
                <div className="ms-auto d-flex align-items-center gap-2 position-relative">

                    {/* Bell icon with notification count */}
                    <div style={{ position: 'relative', cursor: 'pointer' }}
                         onClick={() => setShowNotifications(!showNotifications)}>
                        <FaBell size={30} color='#0d6efd'/>
                        {notifications.length > 0 && (
                            <span style={{
                                position: 'absolute', top: -5, right: -5,
                                background: 'red', color: 'white',
                                borderRadius: '50%', fontSize: '0.7rem',
                                width: 18, height: 18,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                    {notifications.length}
                                </span>
                        )}
                    </div>

                    {/* Notification dropdown */}
                    {showNotifications && (
                        <div style={{
                            position: 'absolute', top: '100%', right: 0,
                            background: 'white', border: '1px solid #dadce0',
                            borderRadius: 8, padding: '1rem',
                            width: 300, zIndex: 1000,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Notifications</strong>
                                <button className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setNotifications([])}>
                                    Clear all
                                </button>
                            </div>
                            {notifications.length === 0
                                ? <p className="text-muted">No notifications</p>
                                : notifications.map((note, index) => (
                                    <div key={index} style={{
                                        padding: '0.5rem',
                                        borderBottom: '1px solid #eee'
                                    }}>
                                        {note}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                <button className="btn btn-secondary">Logged in as {username}</button>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>)}
        </header>

        <Routes>
            <Route path="/" element={<Login onLogin={setUsername}/>} exact/>
            <Route path="/Overview" element={<Overview username={username} currentSheet={currentSheet} setCurrentSheet={setCurrentSheet}/>} exact/>
            <Route path="/Expenses" element={<Expenses username={username} currentSheet={currentSheet} setCurrentSheet={setCurrentSheet}/>} exact/>
            <Route path="/Sheets" element={<Sheets username={username} currentSheet={currentSheet} setCurrentSheet={setCurrentSheet}/>} exact/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
        <footer>
            <div className="container-fluid">
                <span className="text-reset">By: Seth Frandsen</span>
                <br/>
                <a href="https://github.com/sethfrand/startup">GitHub</a>
            </div>
        </footer>
    </div>
    </BrowserRouter>);
}
function NotFound() {
    return (
        <div>404 Error Page not found</div>
    );

}