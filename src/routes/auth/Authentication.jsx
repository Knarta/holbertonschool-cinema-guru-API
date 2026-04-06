import { useState } from 'react';
import Button from '../../components/general/Button.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import './auth.css';

function Authentication({ setIsLoggedIn, setUserUsername }) {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="authentication-page">
            <form className="authentication-form">
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
            <input type="hidden" value={Boolean(setIsLoggedIn)} readOnly />
            <input type="hidden" value={Boolean(setUserUsername)} readOnly />
        </div>
    );
}

export default Authentication;
