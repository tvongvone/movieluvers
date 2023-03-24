
import './landingPage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../../store/movies'
import {NavLink} from 'react-router-dom'
import SingleMovie from '../SingleMovie'


const LandingPage = () => {
    const dispatch = useDispatch()
    const moviesData = useSelector(state => state.movies)

    const movies = Object.values(moviesData.allMovies)

    useEffect(() => {
        dispatch(getAllMovies())
    }, [dispatch])


    return movies.length ? (
        <div className="movies-container">
                {movies.map(movie => (
                    <div key={movie.id} className="single-movie">
                        <NavLink to={`/movies/${movie.id}`} >
                            <SingleMovie movie={movie}/>
                        </NavLink>
                    </div>
                ))}
        </div>
    ): <div>Loading</div>
}


export default LandingPage
