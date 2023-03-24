import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMyWatchlists } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import CreateList from "../CreateList";
import SingleWatchList from "../SingleWatchList";



const WatchList = () => {
    const dispatch = useDispatch();
    const watchlistData = useSelector(state => state.watchlists)

    const watchlistArray = Object.values(watchlistData.myWatchLists)

    useEffect(() => {
        dispatch(getMyWatchlists())
    }, [dispatch])

    return watchlistArray.length ? (
        <div className='watchlist-container'>
            {watchlistArray.map(ele => (
                <div key={ele.id}>
                    <SingleWatchList watchlist={ele} />
                </div>

            ))}
            <OpenModalButton modalComponent={<CreateList />} styleOption='addIcon' buttonText={<i style={{fontSize: '20px'}} className="fa-solid fa-plus"></i>}  />
        </div>
    ): <div>
         <h1>You currently have no list</h1>
         <OpenModalButton modalComponent={<CreateList />} styleOption='addIcon' buttonText={<i style={{fontSize: '20px'}} className="fa-solid fa-plus"></i>}  />
    </div>

}


export default WatchList
