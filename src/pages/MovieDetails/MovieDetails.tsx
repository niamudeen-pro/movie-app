import { useParams } from 'react-router';
import styles from './MovieDetails.module.css';
import Loader from '../../components/Loader';
import ErrorPage from '../../components/error/ErrorPage';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
import { useMovieDetails } from '../../hooks/useMovieDetails';

export default function MovieDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { movie, loading, error } = useMovieDetails(id);

    if (loading) return <Loader />
    if (error) return <ErrorPage message={error} />
    if (!movie) return <EmptyPlaceholder message="Movie not found" />
    return (
        <section className={styles.movie__detail__section}>
            <article className={styles.movie__detail__card}>
                {/* Movie poster */}
                <img
                    src={movie?.Poster}
                    alt={`Poster of ${movie.Title}`}
                    className={styles.image}
                />
                {/* Movie information */}
                <div className={styles.info}>
                    <h2 className={styles.title}>{movie.Title}</h2>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>

                    {/* Ratings list */}
                    <div>
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
            </article>
        </section>
    );
}
