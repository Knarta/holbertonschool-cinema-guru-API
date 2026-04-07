import { useState } from 'react';
import axios from 'axios';
import Button from '../../components/general/Button.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import './auth.css';

function Authentication({ setIsLoggedIn, setUserUsername }) {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const route = _switch ? '/api/auth/login' : '/api/auth/register';

        try {
            const response = await axios.post(route, { username, password });
            if (_switch) {
                const accessToken = response.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setUserUsername(username);
                setIsLoggedIn(true);
            } else {
                // After successful account creation, return to Sign In flow.
                localStorage.removeItem('accessToken');
                setPassword('');
                setSwitch(true);
                setIsLoggedIn(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    return (
        <div className="authentication-page">
            <form className="authentication-form" onSubmit={handleSubmit}>
                <div className="authentication-header">
                    <Button
                        label="Sign In"
                        className={`auth-switch-button ${_switch ? 'auth-switch-button-active' : ''}`}
                        onClick={(event) => {
                            event.preventDefault();
                            setSwitch(true);
                        }}
                    />
                    <Button
                        label="Sign Up"
                        className={`auth-switch-button ${!_switch ? 'auth-switch-button-active' : ''}`}
                        onClick={(event) => {
                            event.preventDefault();
                            localStorage.removeItem('accessToken');
                            setIsLoggedIn(false);
                            setSwitch(false);
                        }}
                    />
                </div>

                <div className="authentication-content">
                    {_switch ? (
                        <Login
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    ) : (
                        <Register
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}

export default Authentication;
