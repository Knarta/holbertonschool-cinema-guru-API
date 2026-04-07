import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard.jsx';
import Filter from '../../components/movies/Filter.jsx';
import Button from '../../components/general/Button.jsx';
import './dashboard.css';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [genres, setGenres] = useState([]);
    const [sort, setSort] = useState('');
    const [title, setTitle] = useState('');
    const [page, setPage] = useState(1);

    const loadMovies = (targetPage) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setMovies([]);
            return;
        }

        axios
            .get('/api/titles/advancedsearch', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    minYear,
                    maxYear,
                    genres: genres.join(','),
                    title,
                    sort,
                    page: targetPage,
                },
            })
            .then((response) => {
                const incoming = response?.data?.titles || [];
                if (targetPage === 1) {
                    setMovies(incoming);
                } else {
                    setMovies((prev) => [...prev, ...incoming]);
                }
            })
            .catch(() => {
                if (targetPage === 1) {
                    setMovies([]);
                }
            });
    };

    useEffect(() => {
        setPage(1);
        loadMovies(1);
    }, [minYear, maxYear, genres, title, sort]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(nextPage);
    };

    return (
        <div>
            <Filter
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                sort={sort}
                setSort={setSort}
                genres={genres}
                setGenres={setGenres}
                title={title}
                setTitle={setTitle}
            />

            <ul className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </ul>

            <Button label="Load More.." onClick={handleLoadMore} />
        </div>
    );
}

export default HomePage;
