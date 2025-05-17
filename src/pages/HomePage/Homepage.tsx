import { useEffect, useState } from "react";
import MoviesList from "../../components/movies/MoviesList";
import { Link } from "react-router";
import styles from "./Homepage.module.css";
import PageHeader from "../../components/page-header/PageHeader";
import ErrorPage from "../../components/error/ErrorPage";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";
import { useMovieSearch } from "../../hooks/useMovieSearch";

export default function Homepage() {
    const [searchText, setSearchText] = useState("");
    const { movies, loading, error, handleSearch, setMovies } = useMovieSearch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedQuery = searchText.trim();
        if (!trimmedQuery) return;
        await handleSearch(trimmedQuery);
    };

    useEffect(() => {
        // Clear movies list when search text is empty or just spaces
        if (!searchText.trim()) {
            setMovies(null);
        }
    }, [searchText, setMovies]);

    if (error) return <ErrorPage message={error} />
    return (
        <>
            <PageHeader mainHeading="Search Movies" subHeading="Search your favorite movies">
                {/* Search block */}
                <form onSubmit={handleSubmit} className={styles.search__container}>
                    <input
                        type="text"
                        placeholder="Search Movies here....."
                        value={searchText}
                        onChange={handleInputChange}
                        className={styles.input__text}
                    />
                    <button type="submit">{loading ? "Searching..." : "Search"}</button>
                </form>

                {/* Watch your favorite movies */}
                <p>
                    <Link to="/favorites" className={styles.watch__fav}>
                        Watch your favorite movies here
                    </Link>
                </p>
            </PageHeader>
            {/* Rendering movie cards */}
            {movies ? (
                <section className="responsive__container">
                    <MoviesList movies={movies} loading={loading} />
                </section>
            ) : (
                <EmptyPlaceholder />
            )}
        </>

    );
}
