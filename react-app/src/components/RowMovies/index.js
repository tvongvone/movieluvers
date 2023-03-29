import SingleMovie from "../SingleMovie"
import { NavLink } from "react-router-dom"


const RowMovies = ({title ,movies}) => {


    return movies.length && (
        <div className="movies-container">
                <h1>{title}</h1>
                <div style={{display: 'flex'}}>
                    {movies.map(movie => (
                        <div key={movie.id}>
                            <NavLink to={`/movies/${movie.id}`} >
                                <SingleMovie movie={movie}/>
                            </NavLink>
                        </div>
                    ))}
                </div>
        </div>
    )
}


export default RowMovies
