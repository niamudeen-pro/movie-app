import { RouterProvider } from 'react-router';
import MovieProvider from './context/MoviesProvider';
import router from './routes';

export default function App() {
  return (
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  )
}
