import './search.css'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SingleMovie from '../SingleMovie'



function SearchComponent() {
    const movieData = useSelector(state => state.movies)


    const movies = Object.values(movieData.results)


    return (
        <div className="search-container">
            {movies.length ? (
                <div style={{display: 'flex', flexWrap: 'wrap', padding: '100px'}}>
                    {movies.map(movie => (
                        <div className="single-search" key={movie.id}>
                            <NavLink to={`/movies/${movie.id}`} >
                                <SingleMovie movie={movie}/>
                            </NavLink>
                        </div>
                    ))}
                </div>
            ): <div style={{display: 'flex', justifyContent: 'center', padding: '100px'}}>No results were found</div>}
        </div>
    )
}


export default SearchComponent
