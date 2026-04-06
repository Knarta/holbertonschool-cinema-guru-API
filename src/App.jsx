import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import Authentication from './routes/auth/Authentication.jsx';

function Dashboard({ userUsername }) {
    return <div className="App">Welcome {userUsername}</div>;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUsername, setUserUsername] = useState('');

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return;
            }

            try {
                const response = await axios.post(
                    '/api/auth/',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );

                setIsLoggedIn(true);
                setUserUsername(response.data.username);
            } catch (error) {
                setIsLoggedIn(false);
                setUserUsername('');
            }
        };

        checkAccessToken();
    }, []);

    return isLoggedIn ? (
        <Dashboard userUsername={userUsername} />
    ) : (
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
    );
}

export default App;
