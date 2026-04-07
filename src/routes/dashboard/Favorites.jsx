import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard.jsx';
import './dashboard.css';

function Favorites() {
    const [movies, setMovies] = useState([]);

    const loadFavorites = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setMovies([]);
            return;
        }

        axios
            .get('/api/titles/favorite/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const apiMovies = Array.isArray(response.data) ? response.data : [];
                const localMovies = JSON.parse(localStorage.getItem('localFavorites') || '[]');
                setMovies(apiMovies.length > 0 ? apiMovies : localMovies);
            })
            .catch(() => {
                const localMovies = JSON.parse(localStorage.getItem('localFavorites') || '[]');
                setMovies(localMovies);
            });
    };

    useEffect(() => {
        loadFavorites();
        window.addEventListener('movies:list-updated', loadFavorites);
        return () => {
            window.removeEventListener('movies:list-updated', loadFavorites);
        };
    }, []);

    return (
        <div>
            <h1 className="dashboard-page-title">Movies you like</h1>
            <ul className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </ul>
        </div>
    );
}

export default Favorites;
