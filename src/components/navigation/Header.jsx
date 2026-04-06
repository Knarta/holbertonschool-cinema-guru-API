import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';

function Header({ userUsername, setIsLoggedIn }) {
    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <nav className="header-nav">
            <img src="https://picsum.photos/100/100" alt="User avatar" />
            <p>Welcome, {userUsername}</p>
            <span className="logout-action" onClick={logout} role="button" tabIndex={0}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
            </span>
        </nav>
    );
}

export default Header;
