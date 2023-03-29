import './homepage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../../store/movies'
import {NavLink} from 'react-router-dom'
import SingleMovie from '../SingleMovie'
import RowMovies from '../RowMovies'



const HomePage = () => {
    const dispatch = useDispatch()
    const moviesData = useSelector(state => state.movies)

    const movies = Object.values(moviesData.allMovies)

    useEffect(() => {
        dispatch(getAllMovies())
    }, [dispatch])

    return movies.length ? (
        <>
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url(${movies[1].backdropPath})`,
            backgroundPosition: "center center"
        }}>

            <div className='banner-contents'>
                <h1 className='banner-title'>{movies[1].title}</h1>
                <div className='banner-buttons'>
                    <button className="banner-btn">Play</button>
                    <button className='banner-btn'>Watchlist</button>
                </div>
                <h1 className='banner-description'>{movies[1].overview}</h1>
            </div>

            <div className="fade-bottom"></div>
        </header>
        <RowMovies movies={movies} />

</>
    ): <div>Loading</div>
}


export default HomePage
