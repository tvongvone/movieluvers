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
import ReactStars from 'react-rating-stars-component'

const API_KEY = process.env.REACT_APP_API_KEY


const MovieDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const [trailer, setTrailer] = useState('')
    const [rate, setRating] = useState(0)
    const movieDetails = useSelector(state => state.movies.singleMovie)
    const reviewData = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const [starKey, setStar] = useState(0)

    const {closeModal} = useModal()
    const reviews = Object.values(reviewData.movieReviews)

    const userArray = reviews.map(ele => ele.user.id)

    const ratings = reviews.map(ele => ele.rating)



    const opts = {
        height: 500,
        width: 700,
        playerVars: {
          autoplay: 1
        }
    }

    const getRatings = async () => {
        const data = await dispatch(getMovieReviews(id))

        if(data) {
            let sum = 0
            if(data) {

                for(let i = 0; i < data.length; i++) {
                    sum += data[i].rating
                }

                setRating(sum / ratings.length)
                setStar(Math.floor(Math.random() * (100 - 1) + 1))
            }
        }
    }

    const fetchVideo = async () => {

        const data = await dispatch(getSingleMovie(id))

        if(data) {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${data.apiId}/videos?api_key=${API_KEY}&language=en-US`)

            if(response?.data?.results?.find(ele => ele.name === 'Official Trailer')) {
                setTrailer(response.data.results.find(ele => ele.name === 'Official Trailer'))
            } else if (response.data.results.length){
                setTrailer(response.data.results[response.data.results.length - 1])
            } else {
                setTrailer('')
            }
        }
    }

    console.log(rate)

    useEffect(async () => {
        // dispatch(getSingleMovie(id))
        await fetchVideo()
        // dispatch(getMovieReviews(id))
        await getRatings()
        // if(ratings.length) {
        //     let sum = 0
        //     for(let i = 0; i < ratings.length; i++) {
        //         sum += ratings[i]
        //     }

        //     setRating(sum / ratings.length)
        // }

        return () => {
            dispatch(removeSingle())
            setTrailer('')
            closeModal()
        }
    }, [dispatch, id, rate])

    return movieDetails && (
        <div className="details-container">
            <div className="details-content">
                <div className='backdrop' style={{backgroundImage: `url(${movieDetails.backdropPath})`, objectFit: 'cover'}}>
                    <div className='movie-info'>
                        <img className='movie-info-img'src={movieDetails.posterPath} alt='' />
                        <div className='movie-description'>
                            <h1>{movieDetails.title}</h1>
                            <div className='movie-overview'>
                            {ratings.length ? (
                                <div style={{'display': 'flex', 'alignItems': 'flex-end'}}>
                                <ReactStars size={30} count={5} isHalf={true} color='white'
                                    emptyIcon={<i className="far fa-star" />}
                                    value={rate} key={starKey} />
                                <div style={{'marginBottom': '7px'}}>({rate})</div>
                                </div>
                            ): <div style={{'paddingBottom': '10px'}}>Currently no ratings for this movie</div>}

                            {trailer && (
                                <OpenModalButton styleOption={'play-button'} modalComponent={<YouTube onEnd={() => closeModal()} opts={opts} videoId={trailer?.key}/>} buttonText={<div>
                                    <i style={{marginLeft: '15px'}} className="fa-solid fa-play"></i>
                                    <span style={{marginLeft: '15px',fontSize: '18px'}}>Play trailer</span>
                                </div>}/>
                            )}
                                <h2 style={{marginBottom: '10px'}}>Overview</h2>
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
                        <>
                            <div style={{'marginLeft': '40px', 'marginTop': '40px'}}>Leave a review</div>
                            <CreateReview id={id}/>
                        </>

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
