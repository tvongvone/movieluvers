import './homepage.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../../store/movies'
import RowMovies from '../RowMovies'
import videoBg from '../../assets/interstellar.mp4'
import titleImage from '../../assets/title.png'
import { NavLink } from 'react-router-dom'
import {FaGithub} from 'react-icons/fa'






const HomePage = () => {
    const dispatch = useDispatch()
    const moviesData = useSelector(state => state.movies)
    const [showVid, setVid] = useState(true)

    const movies = Object.values(moviesData.allMovies)
    const oldMovies = Object.values(moviesData.bestMovies)
    const upcoming = Object.values(moviesData.upcomingMovies)

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

                    <NavLink to={'/movies/22'}><button className="banner-btn">More info</button></NavLink>
                    <button onClick={() => setVid(!showVid)} className='banner-btn'>Display</button>
                </div>

                <div className="fade-bottom"></div>
            </div>
            {showVid && (
                <video
                    className="bgvideo"
                    src={videoBg}
                    autoPlay
                    loop
                    muted>
                </video>
            )}



        </div>

        <RowMovies title={'Recommended movies'} movies={movies} />

        <RowMovies title={'Upcoming movies'} movies={upcoming} />

        <RowMovies title={'Top Rated movies'} movies={oldMovies} />



        <footer>
            <div className="footer-container">
            <NavLink to={{ pathname: "https://github.com/tvongvone" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
            <div className="logo-container">
            <FaGithub className="logo" />
            <div>Tony Vongvone</div>
        </div>
          </NavLink>
            </div>
        </footer>

</>
    ): <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px', color: 'white'}}>Loading...</div>
}


export default HomePage
