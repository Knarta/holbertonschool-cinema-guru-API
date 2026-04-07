import { useState } from 'react';
import Input from '../../components/general/Input.jsx';
import Button from '../../components/general/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faKey, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import './auth.css';

function Register({ username, password, setUsername, setPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-form">
            <h2 className="auth-title">Create your account</h2>
            <Input
                label={
                    <>
                        <FontAwesomeIcon icon={faUser} />
                        Username:
                    </>
                }
                type="text"
                value={username}
                setValue={setUsername}
                inputAttributes={{ placeholder: '' }}
            />
            <Input
                label={
                    <>
                        <FontAwesomeIcon icon={faKey} />
                        Password:
                    </>
                }
                type={showPassword ? 'text' : 'password'}
                value={password}
                setValue={setPassword}
                endIcon={showPassword ? faEyeSlash : faEye}
                showEndIcon={Boolean(password)}
                onEndIconClick={() => setShowPassword((prev) => !prev)}
                inputAttributes={{ placeholder: '' }}
            />
            <div className="login-submit-row">
                <Button label="Sign Up" icon={faPlus} className="login-submit-button" type="submit" />
            </div>
        </div>
    );
}

export default Register;
