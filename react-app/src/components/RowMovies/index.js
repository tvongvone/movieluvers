import SingleMovie from "../SingleMovie"
import { NavLink } from "react-router-dom"
import './rowmovies.css'


const RowMovies = ({title ,movies}) => {


    return movies.length && (
        <div className="movies-container">
                <h1 style={{marginBottom: '20px'}}>{title}</h1>
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
