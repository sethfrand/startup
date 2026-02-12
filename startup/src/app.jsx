import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



import {BrowserRouter as Router, Routes, Route, NavLink, BrowserRouter} from "react-router-dom";
import Overview from './overview/overview';
import Expenses from './expenses/expenses';
import Sheets from './sheets/sheets';
import Login from './login/login';


export default function App() {
    return (
    <BrowserRouter>
    <div className='body bg-dark text-light'>
        <header className="container-fluid bg-dark text-white text-center py-3 position-relative">

            <nav className="navbar fixed-top navbar-dark bg-dark px-3">
                <ul className="navbar-nav flex-row gap-3 ms-auto">
                    <li className="nav-item"><NavLink className="nav-link" to="Overview">Overview</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="Expenses">Expenses</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="Sheets">All Sheets</NavLink></li>
                </ul>
            </nav>
        </header>

        <Routes>
            <Route path="/" element={<Login/>} exact/>
            <Route path="/Overview" element={<Overview/>} exact/>
            <Route path="/Expenses" element={<Expenses/>} exact/>
            <Route path="/Sheets" element={<Sheets/>} exact/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>


        <footer className="bg-dark text-white text-white-70">
            <div className="container-fluid">
                <span className="text-reset">By: Seth Frandsen</span>
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