import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard.jsx';
import './dashboard.css';

function WatchLater() {
    const [movies, setMovies] = useState([]);

    const loadWatchLater = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setMovies([]);
            return;
        }

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios
            .get('/api/titles/watchlater/', { headers })
            .catch(() => axios.get('/api/titles/watchLater/', { headers }))
            .then((response) => {
                const apiMovies = Array.isArray(response.data) ? response.data : [];
                const localMovies = JSON.parse(localStorage.getItem('localWatchLater') || '[]');
                setMovies(apiMovies.length > 0 ? apiMovies : localMovies);
            })
            .catch(() => {
                const localMovies = JSON.parse(localStorage.getItem('localWatchLater') || '[]');
                setMovies(localMovies);
            });
    };

    useEffect(() => {
        loadWatchLater();
        window.addEventListener('movies:list-updated', loadWatchLater);
        return () => {
            window.removeEventListener('movies:list-updated', loadWatchLater);
        };
    }, []);

    return (
        <div>
            <h1 className="dashboard-page-title">Movies to watch later</h1>
            <ul className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </ul>
        </div>
    );
}

export default WatchLater;
