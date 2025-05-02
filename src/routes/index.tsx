import { createBrowserRouter } from 'react-router';
import Homepage from '../pages/HomePage/Homepage'
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import Favorites from '../pages/Favorites/Favorites';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/movie/:id",
        element: <MovieDetails />
    },
    {
        path: "/favorites",
        element: <Favorites />
    },
]);

export default router;