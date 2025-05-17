import { useEffect, useState } from 'react';
import { fetchMovieById } from '../services/apis/movies';
import { Movie } from '../types/movies';

export function useMovieDetails(id?: string) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getMovieDetails = async (movieId: string) => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchMovieById(movieId);
            setMovie(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load movie details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        getMovieDetails(id);
    }, [id]);

    return { movie, loading, error };
}
