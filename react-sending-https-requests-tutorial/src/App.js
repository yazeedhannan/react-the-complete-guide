import {Fragment, useCallback, useEffect, useState} from "react";

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovieHandlerAlternative = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://react-http-870a0-default-rtdb.firebaseio.com/movies.json');

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();

            const loadedMovies = [];

            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate
                });
            }

            /* const transformedMovies = data.results.map(movieData => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                };
            });

            setMovies(transformedMovies); */

            setMovies(loadedMovies);
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMovieHandlerAlternative();
    }, [fetchMovieHandlerAlternative]);

    function fetchMoviesHandler() {
        fetch('https://swapi.py4e.com/api/films/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const transformedMovies = data.results.map(movieData => {
                    return {
                        id: movieData.episode_id,
                        title: movieData.title,
                        openingText: movieData.opening_crawl,
                        releaseDate: movieData.release_date
                    };
                });

                setMovies(transformedMovies);
            });
    }

    async function addMovieHandler(movie) {
        const response = await fetch("https://react-http-870a0-default-rtdb.firebaseio.com/movies.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        });

        const data = await response.json();
        console.log(data);
    }

    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMovieHandlerAlternative}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </Fragment>
    );
}

export default App;
