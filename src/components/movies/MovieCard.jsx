import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import './movies.css';

function MovieCard({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const imdbId = movie?.imdbId || movie?.imdbid;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || !imdbId) {
            setIsFavorite(false);
            setIsWatchLater(false);
            return;
        }

        const headers = { Authorization: `Bearer ${accessToken}` };
        const watchLaterRequest = axios
            .get('/api/titles/watchlater/', { headers })
            .catch(() => axios.get('/api/titles/watchLater/', { headers }));

        Promise.all([
            axios.get('/api/titles/favorite/', { headers }),
            watchLaterRequest,
        ])
            .then(([favoriteResponse, watchLaterResponse]) => {
                const favorites = Array.isArray(favoriteResponse.data) ? favoriteResponse.data : [];
                const watchLater = Array.isArray(watchLaterResponse.data) ? watchLaterResponse.data : [];

                setIsFavorite(favorites.some((item) => (item.imdbId || item.imdbid) === imdbId));
                setIsWatchLater(watchLater.some((item) => (item.imdbId || item.imdbid) === imdbId));
            })
            .catch(() => {
                setIsFavorite(false);
                setIsWatchLater(false);
            });
    }, [imdbId]);

    const handleClick = (type) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || !imdbId) {
            return;
        }

        const headers = { Authorization: `Bearer ${accessToken}` };
        const isSelected = type === 'favorite' ? isFavorite : isWatchLater;
        const method = isSelected ? 'delete' : 'post';
        const route = `/api/titles/${type}/${imdbId}`;
        const fallbackRoute = type === 'watchlater' ? `/api/titles/watchLater/${imdbId}` : route;
        if (type === 'favorite') {
            setIsFavorite((prev) => !prev);
        } else {
            setIsWatchLater((prev) => !prev);
        }
        const request = axios({ method, url: route, headers }).catch(() => axios({ method, url: fallbackRoute, headers }));
        const storageKey = type === 'favorite' ? 'localFavorites' : 'localWatchLater';
        const localMovies = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const filtered = localMovies.filter((item) => (item.imdbId || item.imdbid) !== imdbId);
        const updatedLocal = isSelected ? filtered : [...filtered, movie];
        localStorage.setItem(storageKey, JSON.stringify(updatedLocal));

        request
            .then(() => {
                window.dispatchEvent(new CustomEvent('movies:list-updated'));
            })
            .catch(() => {
                if (type === 'favorite') {
                    setIsFavorite((prev) => !prev);
                } else {
                    setIsWatchLater((prev) => !prev);
                }
            });
    };

    const poster = Array.isArray(movie?.imageurls) ? movie.imageurls[0] : '';

    return (
        <li className="movie-card">
            <div className="movie-card-poster-wrapper">
                {poster ? <img className="movie-card-poster" src={poster} alt={movie?.title || 'Movie poster'} /> : null}
            </div>
            <div className="movie-card-actions">
                <button
                    type="button"
                    className={`movie-card-action-button ${isWatchLater ? 'active' : ''}`}
                    onClick={() => handleClick('watchlater')}
                    aria-label="Add to watch later"
                >
                    <FontAwesomeIcon icon={faClock} className="movie-card-action" />
                </button>
                <button
                    type="button"
                    className={`movie-card-action-button ${isFavorite ? 'active' : ''}`}
                    onClick={() => handleClick('favorite')}
                    aria-label="Add to favorites"
                >
                    <FontAwesomeIcon icon={faStar} className="movie-card-action" />
                </button>
            </div>

            <h3 className="movie-card-title">{movie?.title}</h3>
            <p className="movie-card-synopsis">{movie?.synopsis}</p>
            <div className="movie-card-genres">
                {Array.isArray(movie?.genres)
                    ? movie.genres.map((genre) => (
                        <span key={genre} className="movie-card-genre-tag">
                            {genre}
                        </span>
                    ))
                    : null}
            </div>
        </li>
    );
}

export default MovieCard;
