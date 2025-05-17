import MovieCard from "./MovieCard";
import { Movie } from "../../types/movies";
import Loader from "../Loader";
import EmptyPlaceholder from "../EmptyPlaceholder";

type MoviesListProps = {
    movies: Movie[] | null;
    loading?: boolean;
};

export default function MoviesList({ movies, loading = false }: MoviesListProps) {
    if (loading) return <Loader />;
    if (!movies || movies.length === 0) return <EmptyPlaceholder message="No movies found" />
    return (
        <div className="movies__container">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
}
