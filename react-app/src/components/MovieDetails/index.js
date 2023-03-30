import {useSelector, useDispatch} from 'react-redux'
import './moviedetails.css'
import { useEffect, useState } from 'react'
import { getSingleMovie, removeSingle } from '../../store/movies'
import {useParams} from 'react-router-dom'
import { getMovieReviews } from '../../store/reviews'
import ReviewCard from '../ReviewCard'
import CreateReview from '../CreateReview'
import YouTube from 'react-youtube'
import OpenModalButton from '../OpenModalButton'
import axios from 'axios'
import { useModal } from '../../context/Modal'




const MovieDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const [trailer, setTrailer] = useState('')
    const movieDetails = useSelector(state => state.movies.singleMovie)
    const reviewData = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)

    const {closeModal} = useModal()
    const reviews = Object.values(reviewData.movieReviews)

    const userArray = reviews.map(ele => ele.user.id)

    const opts = {
        height: 500,
        width: 700,
        playerVars: {
          autoplay: 1
        }
    }


    const fetchVideo = async () => {

        const data = await dispatch(getSingleMovie(id))

        if(data) {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${data.apiId}/videos?api_key=ca5c34933457ac59352b1c1d718b3237&language=en-US`)

            if(response.data.results.find(ele => ele.name === 'Official Trailer')) {
                setTrailer(response.data.results.find(ele => ele.name === 'Official Trailer'))
            } else if (response.data.results.length){
                setTrailer(response.data.results[response.data.results.length - 1])
            } else {
                setTrailer(false)
            }
        }
    }
    useEffect(() => {
        // dispatch(getSingleMovie(id))
        fetchVideo()
        dispatch(getMovieReviews(id))


        return () => {
            dispatch(removeSingle())
            closeModal()
        }
    }, [dispatch, id])

    return movieDetails && (
        <div className="details-container">
            <div className="details-content">
                <div className='backdrop' style={{backgroundImage: `url(${movieDetails.backdropPath})`, objectFit: 'cover'}}>
                    <div className='movie-info'>
                        <img className='movie-info-img'src={movieDetails.posterPath} alt='' />
                        <div className='movie-description'>
                            <h1>{movieDetails.title}</h1>
                            <OpenModalButton styleOption={'play-button'} modalComponent={<YouTube onEnd={() => closeModal()} opts={opts} videoId={trailer.key}/>} buttonText={<div>
                                <i className="fa-solid fa-play"></i>
                                <span style={{fontSize: '18px'}}>Play</span>
                            </div>}/>
                            <div className='movie-overview'>
                                <h3>Overview</h3>
                                <p>{movieDetails.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="fade-bottom"></div>
                </div>

                <div className='reviews-container'>
                    {reviews?.map(review =>(
                        <div key={review.id}>
                            <ReviewCard review={review}/>
                        </div>
                    ))}
                    {user && !userArray.includes(user?.id) && (
                        <CreateReview id={id}/>
                    )}
                    {!user && (
                        <h3>Log in to leave a review</h3>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
