import './singleMovie.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieToWatchList } from '../../store/watchlists'

const SingleMovie = ({movie}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const watchlistData = useSelector(state => state.watchlists)
    const [showMenu, setMenu] = useState(false)

    const userWatchlist = Object.values(watchlistData.myWatchLists)

    const clickHandler = (e) => {
        e.preventDefault();

        setMenu(!showMenu)
    }

    const movieCss = showMenu ? 'movie-dropdown-menu' : 'hidden'

    return movie && (
        <div className='single-movie'>
            <button onClick={clickHandler} className='add'>Add</button>
            <div className={movieCss}>
                {user ? (
                    <ul style={{listStyle: 'none'}}>
                        <li>Add to Watchlists</li>
                        {userWatchlist?.map(list => (
                            <li onClick={e => {
                                e.preventDefault()
                                dispatch(addMovieToWatchList({movieId:movie.id, watchlistId:list.id}))
                            }} key={list.id} className="single-watchlist">
                                {list.name}
                            </li>
                        ))}
                    </ul>
                ):<div>You must be logged in to add movies to your watchlist</div>}
            </div>
            <img className="poster" src={movie.posterPath} alt='Movie Poster'/>

        </div>
    )
}

export default SingleMovie
