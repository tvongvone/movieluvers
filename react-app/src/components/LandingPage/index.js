
import './landingPage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../../store/movies'


const LandingPage = () => {
    const dispatch = useDispatch()
    const moviesData = useSelector(state => state.movies)

    const movies = Object.values(moviesData.allMovies)

    useEffect(() => {
        dispatch(getAllMovies())
    }, [dispatch])


    return movies.length ? (
        <div className="movies-container">
            <div className="movie-content">
                {movies.map(movie => (
                    <>
                        <img src={movie.posterPath} alt="movie poster"/>
                        {movie.title}
                    </>
                ))}
            </div>
        </div>
    ): <div>Loading</div>
}


export default LandingPage
