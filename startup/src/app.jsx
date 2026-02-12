import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';



import {Routes, Route, NavLink, BrowserRouter} from "react-router-dom";
import Overview from './overview/overview';
import Expenses from './expenses/expenses';
import Sheets from './sheets/sheets';
import Login from './login/login';


export default function App() {
    return (
    <BrowserRouter>
    <div>
        <header>
        <h1 className="nav-item"><NavLink className="nav-link" to="/">Finance Sheet</NavLink></h1>
            <nav>
                <ul>
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