import './components.css';

function Activity({ activity }) {
    const username = activity?.username || 'Atef';
    const actionLabel = {
        favorite: 'to favorites',
        watchLater: 'to watch later',
        removeFavorited: 'from favorites',
        removeWatchLater: 'from watch later',
    }[activity?.action] || 'to watch later';
    const title = activity?.title || 'The Killer';
    const rawDate = activity?.createdAt || activity?.date;
    const date = rawDate
        ? new Date(rawDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : 'March 28, 2022';

    return (
        <li className="activity-item">
            <p className="activity-text">
                <span className="activity-user">{username}</span> added{' '}
                <span className="activity-title">{title}</span> -{' '}
                {actionLabel} - <span className="activity-date">{date}</span>
            </p>
        </li>
    );
}

export default Activity;
