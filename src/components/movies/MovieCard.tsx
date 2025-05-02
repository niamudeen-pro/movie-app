import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import MOVIE_PLACEHOLDER from "../../assets/movie-placeholder.png";
import { Movie } from "../../types/movies";
import { useMoviesContext } from "../../context/moviesContext";
import styles from './MovieCard.module.css'

type MovieCardProps = {
    movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
    const navigate = useNavigate();
    const { pathname: currentRoute } = useLocation()
    const [imageSrc, setImageSrc] = useState(movie.Poster);

    const {
        favorites,
        handleAddToFavorite,
        handleRemoveFromFavorites,
    } = useMoviesContext();

    const isFavorite = favorites?.some((fav) => fav.imdbID === movie.imdbID);

    const handleMoreInfo = () => {
        if (movie.imdbID) {
            navigate(`/movie/${movie.imdbID}`);
        }
    };

    const handleToggleFavorite = () => {
        if (isFavorite) {
            handleRemoveFromFavorites(movie.imdbID);
        } else {
            handleAddToFavorite(movie);
        }
    };

    const handleImageError = () => {
        setImageSrc(MOVIE_PLACEHOLDER);
    };


    return (
        <div className={styles.movie__card}>
            <img
                src={imageSrc}
                alt={movie.Title}
                onError={handleImageError}
                loading="lazy"
                className={styles.movie__poster}
            />
            <div>
                <h3 className={styles.movie__title}>{movie.Title}</h3>
                <p className={styles.movie__year}>{movie.Year}</p>
            </div>

            {currentRoute === "/favorites" && isFavorite && (
                <button onClick={handleToggleFavorite} className={styles.movie__button}>
                    Remove from Favorites
                </button>
            )}
            {
                !isFavorite &&
                <button onClick={handleToggleFavorite} className={styles.movie__button}>
                    Add To Favorites
                </button>
            }

            <button onClick={handleMoreInfo} className={styles.movie__button}>
                More Info
            </button>
        </div>
    );
}
