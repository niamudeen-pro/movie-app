export type Movie = {
    imdbID: string;
    Title: string;
    Poster: string;
    Type?: string;
    Year?: string;
    Genre?: string;
    Director?: string;
    Plot?: string;
    Ratings?: Array<{ Source: string; Value: string }>;
};
