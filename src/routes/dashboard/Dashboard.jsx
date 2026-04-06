import Header from '../../components/navigation/Header.jsx';
import './dashboard.css';

function Dashboard({ userUsername, setIsLoggedIn }) {
    return (
        <div className="dashboard">
            <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
}

export default Dashboard;
