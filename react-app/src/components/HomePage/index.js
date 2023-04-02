import './homepage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../../store/movies'
import RowMovies from '../RowMovies'
import videoBg from '../../assets/interstellar.mp4'
import titleImage from '../../assets/title.png'





const HomePage = () => {
    const dispatch = useDispatch()
    const moviesData = useSelector(state => state.movies)

    const movies = Object.values(moviesData.allMovies)
    const oldMovies = Object.values(moviesData.bestMovies)

    useEffect(() => {
        dispatch(getAllMovies())
    }, [dispatch])

    return movies.length && oldMovies.length ? (
        <>
        <div className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url(${oldMovies[1].backdropPath})`,
            backgroundPosition: "top center",
        }}>
            <div className='banner-contents'>
                <img className='banner-title' src={titleImage} alt='INTERSTELLAR'/>
                <div className='banner-buttons'>

                    <button className="banner-btn">More info</button>
                    <button className='banner-btn'>Watchlist</button>
                </div>

                <div className="fade-bottom"></div>
            </div>
            <video
                className="bgvideo"
                src={videoBg}
                autoPlay
                loop
                muted>
            </video>


        </div>
        <RowMovies title={'Upcoming movies'} movies={movies} />

        <RowMovies title={'Top Rated movies'} movies={oldMovies} />

</>
    ): <div>Loading</div>
}


export default HomePage
