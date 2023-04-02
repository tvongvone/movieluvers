
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
            <div  className='add'>
                <i onClick={(e) => clickHandler(e, movie.id)} className="fa-solid fa-ban"></i>
            </div>
            <img className="poster" src={movie.posterPath} alt='Movie Poster'/>
        </div>
    )
}

export default RemoveMovie
