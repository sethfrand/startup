import React from 'react';
import Button from 'react-bootstrap/Button';

export function Authenticated(props){
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem('userName');
        props.logout();
    }

    return (
        <div>
            <div className='playerName'>{props.userName}</div>
            <Button variant='btn btn-primary' onClick={() => navigate('/Sheets')}>
                Play
            </Button>
            <Button variant='btn btn-secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}