import React from 'react';

import './login.css';

export default function Login(){
    return (
        <div className="login-page">
        <main>
            <img src="/logo_transparent_banner.png" alt="Finance-Sheet Logo" className="login-logo"/>
            <form action="Overview.html" method="get">
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input className="form-control" placeholder="your@email.com" type="text"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" placeholder="password" type="password"/>
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
                <button className="btn btn-secondary" type="submit">Create</button>
            </form>
        </main>
        </div>

    );
}