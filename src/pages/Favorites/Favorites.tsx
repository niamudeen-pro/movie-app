import MoviesList from "../../components/movies/MoviesList"
import PageHeader from "../../components/page-header/PageHeader"
import { useMoviesContext } from "../../context/moviesContext"

export default function Favorites() {
    const { favorites } = useMoviesContext()
    return (
        <>
            <PageHeader mainHeading="Favorites" subHeading="All your favorite movies in one place" />
            <section className="responsive__container">
                <MoviesList movies={favorites} />
            </section>
        </>
    )
}
