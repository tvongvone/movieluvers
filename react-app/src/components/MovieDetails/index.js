import {useSelector, useDispatch} from 'react-redux'
import './moviedetails.css'
import { useEffect } from 'react'
import { getSingleMovie, removeSingle } from '../../store/movies'
import {useParams} from 'react-router-dom'
import { getMovieReviews } from '../../store/reviews'
import ReviewCard from '../ReviewCard'
import { useState } from 'react'

const MovieDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const movieDetails = useSelector(state => state.movies.singleMovie)
    const reviewData = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)

    const [reviewText, setReview] = useState('')
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])

    const reviews = Object.values(reviewData.movieReviews)

    const userArray = reviews.map(ele => ele.user.id)

    const submitHandler = (e) => {
        e.preventDefault()

        setSubmitted(true)

        if(validationErrors.length) return "Your review has errors"

        const data = await

    }

    useEffect(() => {
        dispatch(getSingleMovie(id))
        dispatch(getMovieReviews(id))

        return () => {
            dispatch(removeSingle())
        }
    }, [dispatch, id])

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
                        <div key={review.id}>
                            <ReviewCard review={review}/>
                        </div>
                    ))}
                    {user && !userArray.includes(user?.id) && (
                        <div className='add-review'>
                            <h2 className='profile-name'>{user.username[0]}</h2>
                            <form onSubmit={submitHandler} className='form-review'>
                                <label className='hidden'>Please provide a brief review (0 to 255) characters</label>
                                <textarea value={reviewText} onChange={e => setReview(e.target.value)} placeholder='Add a review' />
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
