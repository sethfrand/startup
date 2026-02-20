import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';


import './login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    function handleLogin() {
        const existingUser = localStorage.getItem(username);
        if (existingUser) {
            navigate('/Overview');
        } else
            setErrorMessage('User does not exist');
    }

    function handleCreate() {
        const existingUser = localStorage.getItem(username);
        if (existingUser) {
            setErrorMessage('User already exists');
        }
        else {
            localStorage.setItem("userName", username);
            navigate('/Overview');
        }
    }

    return (
        <div className="login-page">
        <main>
            <img src="/logo_transparent_banner.png" alt="Finance-Sheet Logo" className="login-logo"/>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input className="form-control" onChange={(e) => setUsername(e.target.value)} type="text" value={username} placeholder="Username"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password"/>

                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button className="btn btn-primary" type="button" onClick={handleLogin}>Login</button>
                <button className="btn btn-secondary" type="button" onClick={handleCreate}>Create</button>
            </form>
        </main>
        </div>
    );
}