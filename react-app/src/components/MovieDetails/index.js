import {useSelector, useDispatch} from 'react-redux'
import './moviedetails.css'
import { useEffect } from 'react'
import { getSingleMovie, removeSingle } from '../../store/movies'
import {useParams} from 'react-router-dom'
import { getMovieReviews } from '../../store/reviews'

const MovieDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const movieDetails = useSelector(state => state.movies.singleMovie)
    const reviewData = useSelector(state => state.reviews)

    const reviews = Object.values(reviewData.movieReviews)

    useEffect(() => {
        dispatch(getSingleMovie(id))
        dispatch(getMovieReviews(id))

        return () => {
            dispatch(removeSingle())
        }
    }, [dispatch])

    return movieDetails && (
        <div className="details-container">
            <div className="details-content">
                <div className='backdrop' style={{backgroundImage: `url(${movieDetails.backdropPath})`, objectFit: 'cover'}}>

                    <div className='movie-info'>
                        <img src={movieDetails.posterPath} alt='' />
                        <div className='movie-description'>
                            <h1>{movieDetails.title}</h1>
                            <div className='play-button'>
                                <i className="fa-solid fa-play"></i>
                                <span style={{fontSize: '18px'}}>Play</span>
                            </div>
                            <div className='movie-overview'>
                                <h3>Overview</h3>
                                <p>{movieDetails.overview}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='reviews-container'>
                    {reviews?.map(review =>(
                        <>
                            <h3>A review by {review.user.username}</h3>
                            <p>{review.review}</p>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
