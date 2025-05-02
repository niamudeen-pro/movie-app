import { ReactNode, useEffect, useState } from "react";
import { getItemsFromLocalStorage, setItemsIntoLocalStorage } from "../utils/helper";
import { Movie } from "../types/movies";
import { MoviesContext } from "./moviesContext";

const MovieProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        return getItemsFromLocalStorage("favorites", true) || [];
    });

    useEffect(() => {
        const storedFavorites = getItemsFromLocalStorage("favorites", true);
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
    }, []);

    const handleAddToFavorite = (movie: Movie) => {
        const isAlreadyAdded = favorites.some((fav) => fav.imdbID === movie.imdbID);
        if (isAlreadyAdded) {
            return
        }
        const updatedFavorites = [...favorites, movie];
        setFavorites(updatedFavorites);
        setItemsIntoLocalStorage("favorites", updatedFavorites, true);
    };

    const handleRemoveFromFavorites = (movieId: string) => {
        const updatedFavorites = favorites.filter((fav) => fav.imdbID !== movieId);
        setFavorites(updatedFavorites);
        setItemsIntoLocalStorage("favorites", updatedFavorites, true);
    };

    return (
        <MoviesContext.Provider
            value={{ favorites, handleAddToFavorite, handleRemoveFromFavorites }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MovieProvider;