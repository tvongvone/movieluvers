import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMyWatchlists } from "../../store/watchlists";



const WatchList = () => {
    const dispatch = useDispatch();
    const watchlistData = useSelector(state => state.watchlists)

    const watchlistArray = Object.values(watchlistData.myWatchLists)

    const clickHandler = async () => {

    }

    useEffect(() => {
        dispatch(getMyWatchlists())
    }, [dispatch])

    return watchlistArray.length ? (
        <div className='watchlist-container'>
            {watchlistArray.map(ele => (
                <div>
                    {ele.name}
                </div>
            ))}
            <button onClick={clickHandler}>Create new list</button>
        </div>
    ): <h1>You currently have no list</h1>
}


export default WatchList
