import { useEffect, useState } from 'react';
import { fetchMovieById } from '../../services/apis/movies';
import { useParams } from 'react-router';
import { Movie } from '../../types/movies';
import styles from './MovieDetails.module.css';
import Loader from '../../components/Loader';
import ErrorPage from '../../components/error/ErrorPage';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';

export default function MovieDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            if (id) {
                setLoading(true);
                setError(''); // clear previous error
                try {
                    const movieData = await fetchMovieById(id);
                    setMovie(movieData);
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("Failed to load movie details.");
                    }
                }
                finally {
                    setLoading(false);
                }
            }
        })();
    }, [id]);


    if (loading) return <Loader />
    if (error) return <ErrorPage message={error} />
    if (!movie) return <EmptyPlaceholder message="Movie not found" />
    return (
        <div className={styles.movie__detail__section}>
            <div className={styles.movie__detail__card}>
                <img
                    src={movie?.Poster}
                    alt={movie.Title}
                    className={styles.image}
                />
                <div className={styles.info}>
                    <h2 className={styles.title}>{movie.Title}</h2>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p className={styles.movie_details_card__info}><strong>Ratings:</strong></p>
                    <ul className={styles.movie_details_card__ratings}>
                        {movie?.Ratings?.map((rating, index) => (
                            <li key={index} className={styles.movie_details_card__rating}>
                                <span className={styles.movie_details_card__rating_source}>{rating.Source}:</span>
                                <span className={styles.movie_details_card__rating_value}>{rating.Value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
