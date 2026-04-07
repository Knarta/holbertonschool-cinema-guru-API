import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../../components/navigation/Header.jsx';
import SideBar from '../../components/navigation/SideBar.jsx';
import Filter from '../../components/movies/Filter.jsx';
import MovieCard from '../../components/movies/MovieCard.jsx';
import './dashboard.css';

function HomePage() {
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());
    const [sort, setSort] = useState('default');
    const [genres, setGenres] = useState([]);
    const [title, setTitle] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setMovies([]);
            return;
        }

        const sortParam = sort === 'default' ? '' : sort;

        axios
            .get('/api/titles/advancedsearch', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    minYear,
                    maxYear,
                    sort: sortParam,
                    genres: genres.join(','),
                    title,
                    page: 1,
                },
            })
            .then((response) => {
                setMovies(response?.data?.titles || []);
            })
            .catch(() => {
                setMovies([]);
            });
    }, [minYear, maxYear, sort, genres, title]);

    return (
        <>
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
        </>
    );
}

function Favorites() {
    return null;
}

function WhatchLater() {
    return null;
}

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
                            <Route path="/watchlater" element={<WhatchLater />} />
                            <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Dashboard;
