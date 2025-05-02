const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_OMBD_API_KEY;

export const fetchMovies = async (query: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}?apiKey=${API_KEY}&s=${query}`);
        if (!response.ok) {
            throw new Error(`Oops! Something went wrong. Please try relaoding the page or go back and continue.`);
        }
        const result = await response.json();
        return result?.Search || [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error
    }
};

export const fetchMovieById = async (imdbID: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}?apiKey=${API_KEY}&i=${imdbID}`);
        if (!response.ok) {
            throw new Error(`Oops! Something went wrong. Please try relaoding the page or go back and continue.`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error
    }
}
