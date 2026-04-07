import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFolder, faStar } from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity.jsx';
import './navigation.css';

function SideBar() {
    const [selected, setSelected] = useState('home');
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);
    const navigate = useNavigate();
    const visibleActivities = (activities.length > 0
        ? activities
        : Array.from({ length: 10 }, (_, index) => ({
            id: `placeholder-${index}`,
            username: 'Atef',
            title: 'The Murder House',
            action: 'watchLater',
            date: '2022-03-28T00:00:00.000Z',
        }))).slice(0, 10);

    const setPage = (pageName) => {
        setSelected(pageName);

        if (pageName === 'Home') {
            navigate('/home');
        } else if (pageName === 'Favorites') {
            navigate('/favorites');
        } else if (pageName === 'Watch Later') {
            navigate('/watchlater');
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setActivities([]);
            return;
        }

        axios
            .get('/api/activity', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const normalized = Array.isArray(response.data)
                    ? response.data.map((item) => ({
                        id: item.id,
                        username: item.user?.username,
                        title: item.title?.title,
                        action: item.activityType,
                        date: item.createdAt,
                    }))
                    : [];
                setActivities(normalized);
            })
            .catch(() => {
                setActivities([]);
            });
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', small ? '50px' : '218px');
    }, [small]);

    useEffect(() => {
        if (!small) {
            setShowActivities(true);
        } else {
            setShowActivities(false);
        }
    }, [small]);

    return (
        <nav
            className={`sidebar ${small ? 'sidebar-small' : 'sidebar-open'}`}
            onMouseEnter={() => setSmall(false)}
            onMouseLeave={() => setSmall(true)}
        >
            <ul className="sidebar-nav-list">
                <li
                    className={`sidebar-nav-item ${selected === 'Home' ? 'active' : ''}`}
                    onClick={() => setPage('Home')}
                >
                    <FontAwesomeIcon className="sidebar-nav-icon" icon={faFolder} aria-hidden="true" />
                    <span className="sidebar-item-label">Home</span>
                    {selected === 'Home' ? <span className="sidebar-active-arrow">→</span> : null}
                </li>
                <li
                    className={`sidebar-nav-item ${selected === 'Favorites' ? 'active' : ''}`}
                    onClick={() => setPage('Favorites')}
                >
                    <FontAwesomeIcon className="sidebar-nav-icon" icon={faStar} aria-hidden="true" />
                    <span className="sidebar-item-label">Favorites</span>
                    {selected === 'Favorites' ? <span className="sidebar-active-arrow">→</span> : null}
                </li>
                <li
                    className={`sidebar-nav-item ${selected === 'Watch Later' ? 'active' : ''}`}
                    onClick={() => setPage('Watch Later')}
                >
                    <FontAwesomeIcon className="sidebar-nav-icon" icon={faClock} aria-hidden="true" />
                    <span className="sidebar-item-label">Watch Later</span>
                    {selected === 'Watch Later' ? <span className="sidebar-active-arrow">→</span> : null}
                </li>
            </ul>

            {showActivities ? (
                <section className="sidebar-activities-panel">
                    <div className="sidebar-activities-title">Latest Activities</div>
                    <ul className="sidebar-activities-list">
                        {visibleActivities.map((activity, index) => (
                            <Activity key={activity.id || `${activity.username || 'activity'}-${index}`} activity={activity} />
                        ))}
                    </ul>
                </section>
            ) : null}
        </nav>
    );
}

export default SideBar;
