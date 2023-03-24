import './singlewatchlist.css'

const SingleWatchList = ({watchlist}) => {


    return watchlist && (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {watchlist.name}
            <div style={{display: 'flex'}}>
            {watchlist?.movies.map(movie => (
                <img className='hello' src={movie.posterPath}/>
            ))}
            </div>
        </div>
    )
}

export default SingleWatchList
