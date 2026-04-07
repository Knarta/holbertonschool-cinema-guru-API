import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import './movies.css';

function MovieCard({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || !movie?.imdbId) {
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

                setIsFavorite(favorites.some((item) => item.imdbId === movie.imdbId));
                setIsWatchLater(watchLater.some((item) => item.imdbId === movie.imdbId));
            })
            .catch(() => {
                setIsFavorite(false);
                setIsWatchLater(false);
            });
    }, [movie?.imdbId]);

    const handleClick = (type) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || !movie?.imdbId) {
            return;
        }

        const headers = { Authorization: `Bearer ${accessToken}` };
        const isSelected = type === 'favorite' ? isFavorite : isWatchLater;
        const method = isSelected ? 'delete' : 'post';
        const route = `/api/titles/${type}/${movie.imdbId}`;

        axios({ method, url: route, headers })
            .then(() => {
                if (type === 'favorite') {
                    setIsFavorite((prev) => !prev);
                } else {
                    setIsWatchLater((prev) => !prev);
                }
            })
            .catch(() => {});
    };

    const poster = Array.isArray(movie?.imageurls) ? movie.imageurls[0] : '';

    return (
        <li className="movie-card">
            <div className="movie-card-poster-wrapper">
                {poster ? <img className="movie-card-poster" src={poster} alt={movie?.title || 'Movie poster'} /> : null}
            </div>
            <div className="movie-card-actions">
                <FontAwesomeIcon
                    icon={faClock}
                    className={`movie-card-action ${isWatchLater ? 'active' : ''}`}
                    onClick={() => handleClick('watchlater')}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    className={`movie-card-action ${isFavorite ? 'active' : ''}`}
                    onClick={() => handleClick('favorite')}
                />
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
