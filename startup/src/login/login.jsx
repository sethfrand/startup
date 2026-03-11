import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './login.css';

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    async function handleLogin() {
        const response = await fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({email: username, password: password}),
            headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', username);
            localStorage.removeItem('currentSheet');
            props.onLogin(username);
            navigate('/Sheets');
        } else if (response?.status === 409) {
            setErrorMessage('User already exists or password is incorrect');
        } else {
            setErrorMessage('User does not exist or password is incorrect');
        }
    }
    async function handleCreate() {
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({email: username, password: password}),
            headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', username);
            localStorage.removeItem('currentSheet');
            props.onLogin(username);
            navigate('/Sheets');
        } else if (response?.status === 409) {
            setErrorMessage('User already exists or password is incorrect');
        } else {
            setErrorMessage('User does not exist or password is incorrect');
        }
    }
        return (
            <div className="login-page">
                <main>
                    <img src="/logo_transparent_banner.png" alt="Finance-Sheet Logo" className="login-logo"/>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">@</span>
                            <input className="form-control" onChange={(e) => setUsername(e.target.value)}
                                   type="text"
                                   value={username} placeholder="Username"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">🔒</span>
                            <input className="form-control" onChange={(e) => setPassword(e.target.value)}
                                   type="password" value={password} placeholder="Password"/>
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <button className="btn btn-primary" type="submit" onClick={handleLogin}>Login</button>
                        <button className="btn btn-secondary" type="button" onClick={handleCreate}>Create</button>
                    </form>
                </main>
            </div>
        );
    }