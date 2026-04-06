import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function Authentication() {
    return null;
}

function Dashboard() {
    return null;
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

    return isLoggedIn ? <Dashboard userUsername={userUsername} /> : <Authentication />;
}

export default App;
