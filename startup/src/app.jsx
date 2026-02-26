import React, {useState} from  'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { FaBell } from 'react-icons/fa';


import {Routes, Route, NavLink, BrowserRouter} from "react-router-dom";
import Overview from './overview/overview';
import Expenses from './expenses/expenses';
import Sheets from './sheets/sheets';
import Login from './login/login';


export default function App() {
    const [username, setUsername] = useState('');
    const [currentSheet, setCurrentSheet] = useState(localStorage.getItem('currentSheet') || null);


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
            {username !== '' && <div className="ms-auto d-flex gap-2">
                <FaBell size = {30} color = '#0d6efd'/>
                <button className="btn btn-secondary">Logged in as {username}</button>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>}
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