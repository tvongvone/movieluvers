import './singleMovie.css'

const SingleMovie = ({movie}) => {


    const clickHandler = (e) => {
        e.preventDefault();
    }

    return movie && (
        <div className='single-movie'>
            <button onClick={clickHandler} className='add'>Add</button>
            <img className="poster" src={movie.posterPath} alt='Movie Poster'/>

        </div>
    )
}

export default SingleMovie
