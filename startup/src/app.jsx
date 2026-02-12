import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return <div className='body bg-dark text-light'>
        <header className="container-fluid bg-dark text-white text-center py-3 position-relative">

            <nav className="navbar fixed-top navbar-dark bg-dark px-3">
                <ul className="navbar-nav flex-row gap-3 ms-auto">
                    <li className="nav-item"><a className="nav-link" href="../overview/Overview.html">Overview</a></li>
                    <li className="nav-item"><a className="nav-link" href="../expenses/expenses.html">Expenses</a></li>
                    <li className="nav-item"><a className="nav-link" href="../sheets/sheets.html">All Sheets</a></li>
                </ul>
            </nav>
        </header>


        <main className="container-fluid bg-dark text-white text-center">Components will go here</main>

        <footer className="bg-dark text-white text-white-70">
            <div className="container-fluid">
                <span className="text-reset">By: Seth Frandsen</span>
                <a href="https://github.com/sethfrand/startup">GitHub</a>
            </div>
        </footer>
    </div>
}
