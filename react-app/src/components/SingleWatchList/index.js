import './singlewatchlist.css'
import RemoveMovie from '../RemoveMovie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteSingleWatchlist } from '../../store/watchlists'
import OpenModalButton from '../OpenModalButton'
import EditWatchlist from '../EditWatchlist'

const SingleWatchList = ({watchlist}) => {
    const dispatch = useDispatch()
    // const [isHovering, setHovering] = useState(false)

    // const handleMouseOver = () => {
    //     setHovering(true)
    // }

    // const handleMouseOut = () => {
    //     setHovering(false)
    // }


    return watchlist && (
        <div className='single-watchlist-row'>
            <div className='watchlist-title'>
                <h1>{watchlist.name}</h1>
                    <div className='icons'>
                        <OpenModalButton modalComponent={<EditWatchlist watchlist={watchlist}/>} styleOption={'edit-pen'} buttonText={<i className="fa-solid fa-pencil"></i>}/>
                        <i onClick={() => dispatch(deleteSingleWatchlist(watchlist.id))} className="fa-solid fa-trash-can"></i>
                    </div>
            </div>
            <div style={{display: 'flex'}}>
            {watchlist?.movies.map(movie => (
                <div key={movie.id}>
                    <RemoveMovie movie={movie} watchlistId={watchlist.id}/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SingleWatchList
