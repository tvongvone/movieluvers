import './singleMovie.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieToWatchList } from '../../store/watchlists'
import { useRef } from 'react'

const SingleMovie = ({movie}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const watchlistData = useSelector(state => state.watchlists)

    const menu = useRef(null)

    const [showMenu, setMenu] = useState(false)

    const closeOpenMenus = (e) => {
        if (menu.current && showMenu && !menu.current.contains(e.target)) {
          setMenu(false);
        }
      };

    const userWatchlist = Object.values(watchlistData.myWatchLists)

    const clickHandler = (e) => {
        e.preventDefault();

        setMenu(!showMenu)
    }

    const movieCss = showMenu ? 'movie-dropdown-menu' : 'hidden'

    document.addEventListener("mousedown", closeOpenMenus)

    return movie && (
        <div className='single-movie'>
            <button onClick={clickHandler} className='add'>Add</button>
            <div ref={menu} className={movieCss}>
                {user ? (
                    <ul style={{listStyle: 'none'}}>
                        <li>Add to Watchlists</li>
                        {userWatchlist?.map(list => (
                            <li onClick={e => {
                                e.preventDefault()
                                dispatch(addMovieToWatchList({movieId:movie.id, watchlistId:list.id}))
                                setMenu(!showMenu)
                            }} key={list.id} className="single-watchlist">
                                <p style={{textOverflow: 'ellipsis'}}>{list.name}</p>
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
