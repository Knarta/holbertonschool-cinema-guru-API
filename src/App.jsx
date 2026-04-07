import { useState } from 'react';
import './index.css';
import Authentication from './routes/auth/Authentication.jsx';
import Dashboard from './routes/dashboard/Dashboard.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUsername, setUserUsername] = useState('');

    return isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
    ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
    );
}

export default App;
