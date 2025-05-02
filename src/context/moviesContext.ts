import { createContext, useContext } from "react";
import { Movie } from "../types/movies";

type MoviesContextType = {
    favorites: Movie[];
    handleAddToFavorite: (movie: Movie) => void;
    handleRemoveFromFavorites: (movieId: string) => void;
};


export const MoviesContext = createContext<MoviesContextType>({
    favorites: [],
    handleAddToFavorite: () => { },
    handleRemoveFromFavorites: () => { },
});

export const useMoviesContext = () => useContext(MoviesContext);



