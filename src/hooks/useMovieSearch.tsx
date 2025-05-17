import { useState } from "react";
import { fetchMovies } from "../services/apis/movies";

export function useMovieSearch() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (query: string) => {
        if (!query) return;
        try {
            setLoading(true);
            setError("");
            const result = await fetchMovies(query);
            setMovies(result);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };


    return { movies, loading, error, handleSearch, setMovies };
}
