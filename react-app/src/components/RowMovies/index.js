import SingleMovie from "../SingleMovie"
import { NavLink } from "react-router-dom"


const RowMovies = ({movies}) => {


    return movies.length && (
        <div className="movies-container">
                {movies.map(movie => (
                    <div key={movie.id} className="single-movie">
                        <NavLink to={`/movies/${movie.id}`} >
                            <SingleMovie movie={movie}/>
                        </NavLink>
                    </div>
                ))}
        </div>
    )
}


export default RowMovies
