

import { useDispatch } from 'react-redux'
import { removeMovieFromWatchList } from '../../store/watchlists'

const RemoveMovie = ({movie, watchlistId}) => {
    const dispatch = useDispatch();


    const clickHandler = (e, id) => {
        e.preventDefault()
        dispatch(removeMovieFromWatchList({movieId: id, watchlistId}))
    }


    return movie && (
        <div className='single-movie'>
            <button onClick={(e) => clickHandler(e, movie.id)} className='add'>Remove</button>
            <img className="poster" src={movie.posterPath} alt='Movie Poster'/>
        </div>
    )
}

export default RemoveMovie
