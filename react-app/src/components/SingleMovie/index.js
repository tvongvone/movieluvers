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
        <>
        <div className='single-movie'>
            <div className="add">
                <i onClick={clickHandler} className="fa-solid fa-circle-plus"></i>
            </div>

            <div ref={menu} className={movieCss}>
                {user ? (
                    <ul style={{listStyle: 'none'}}>
                        <li style={{'color': 'white'}}>Add to Watchlist</li>
                        {userWatchlist?.map(list => (
                            <li onClick={e => {
                                e.preventDefault()
                                dispatch(addMovieToWatchList({movieId:movie.id, watchlistId:list.id}))
                                setMenu(!showMenu)
                            }} key={list.id} className="single-watchlist">
                                <p style={{color: 'white'}}>{list.name}</p>
                            </li>
                        ))}
                    </ul>
                ):<div>You must be logged in to add to Watchlist</div>}
            </div>
            <img className="poster" src={movie.posterPath} alt='Movie Poster'/>



        </div>
        </>
    )
}

export default SingleMovie
