import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/apis/movies";
import MoviesList from "../../components/movies/MoviesList";
import { Link } from "react-router";
import styles from "./Homepage.module.css";
import PageHeader from "../../components/page-header/PageHeader";
import ErrorPage from "../../components/error/ErrorPage";
import EmptyPlaceholder from "../../components/EmptyPlaceholder";

export default function Homepage() {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        setLoading(true);
        setError("");

        try {
            const result = await fetchMovies(trimmedQuery);
            setMovies(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load movie details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await handleSearch(searchText);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await handleSearch(searchText);
        }
    };

    useEffect(() => {
        if (!searchText.trim()) {
            setMovies(null);
        }
    }, [searchText]);

    if (error) return <ErrorPage message={error} />
    return (
        <>
            <PageHeader mainHeading="Search Movies" subHeading="Search your favorite movies">
                <>
                    {/* Movie search form */}
                    <div className={styles.search__container}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search Movies here....."
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                onKeyDown={handleKeyDown}
                                className={styles.input__text}
                            />
                            <button type="submit">{loading ? "Searching..." : "Search"}</button>
                        </form>
                    </div>

                    {/* Link to favorites page */}
                    <span>
                        <Link to="/favorites" className={styles.watch__fav}>
                            Watch your favorites movies here
                        </Link>
                    </span>
                </>
            </PageHeader>

            {/* Show movie results if available, else show empty state */}
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
