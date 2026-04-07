import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../../components/navigation/Header.jsx';
import SideBar from '../../components/navigation/SideBar.jsx';
import HomePage from './HomePage.jsx';
import Favorites from './Favorites.jsx';
import WatchLater from './WatchLater.jsx';
import './dashboard.css';

function Dashboard({ userUsername, setIsLoggedIn }) {
    return (
        <BrowserRouter>
            <div className="dashboard">
                <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
                <div className="dashboard-layout">
                    <SideBar />
                    <main className="dashboard-content">
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/watchlater" element={<WatchLater />} />
                            <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Dashboard;
