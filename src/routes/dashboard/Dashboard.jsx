import Header from '../../components/navigation/Header.jsx';
import SideBar from '../../components/navigation/SideBar.jsx';
import './dashboard.css';

function Dashboard({ userUsername, setIsLoggedIn }) {
    return (
        <div className="dashboard">
            <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
            <div className="dashboard-layout">
                <SideBar />
                <main className="dashboard-content" />
            </div>
        </div>
    );
}

export default Dashboard;
