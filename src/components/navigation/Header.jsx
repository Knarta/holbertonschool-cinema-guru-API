import "./navigation.css";

function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="header-nav">
      <p className="header-brand">Cinema Guru</p>
      <div className="header-right">
        <img className="header-avatar" src="https://picsum.photos/100/100" alt="User avatar" />
        <p className="header-welcome">Welcome, {userUsername}</p>
        <span className="logout-action" onClick={logout} role="button" tabIndex={0}>
          <svg
            className="logout-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 2H3.5C2.67 2 2 2.67 2 3.5V12.5C2 13.33 2.67 14 3.5 14H6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 11L13 8L9.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 8H6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </span>
      </div>
    </nav>
  );
}

export default Header;
