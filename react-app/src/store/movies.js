const GET_ALL_MOVIES = 'movies/GET_ALL_MOVIES'
const GET_SINGLE = 'movies/GET_SINGLE'
const REMOVE_SINGLE = 'movies/REMOVE_SINGLE'
const GET_MOVIE_RESULTS = 'movies/GET_MOVIE_RESULTS'

const getMovies = data => {
    return {
        type: GET_ALL_MOVIES,
        payload: data
    }
}

const getSingle = data => {
    return {
        type: GET_SINGLE,
        payload: data
    }
}

export const removeSingle = () => {
    return {
        type: REMOVE_SINGLE,
    }
}

const getResults = data => {
    return {
        type: GET_MOVIE_RESULTS,
        payload: data
    }
}


// Get all the movies
export const getAllMovies = () => async dispatch => {
    const response = await fetch('/api/movies')



    if(response.ok) {
        const data = await response.json()
        dispatch(getMovies(data))
    }
}

// Get single movie
export const getSingleMovie = (id) => async dispatch => {
    const response = await fetch(`/api/movies/${id}`)

    if(response.ok) {
        const data = await response.json()

        dispatch(getSingle(data))

        return data
    }
}

// Get filtered movies
export const getMovieResults = (obj) => async dispatch => {
    const response = await fetch('/api/movies/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(getResults(data))
    }
}

let initialState = {
    allMovies: {},
    bestMovies:{},
    upcomingMovies: {},
    singleMovie: {},
    results: {}
}

export default function moviesReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_MOVIES: {
            const newState = {...state, allMovies: {}}
            action.payload.new.forEach(ele => newState.allMovies[ele.id] = ele)
            action.payload.old.forEach(ele => newState.bestMovies[ele.id] = ele)
            action.payload.upcoming.forEach(ele => newState.upcomingMovies[ele.id] = ele)
            return newState
        }
        case GET_SINGLE: {
            const newState = {...state, singleMovie: {}}
            newState.singleMovie = action.payload
            return newState
        }

        case REMOVE_SINGLE: {
            const newState = {...state}
            newState.singleMovie = {}
            return newState
        }

        case GET_MOVIE_RESULTS: {
            const newState = {...state, results: {}}
            action.payload.forEach(ele => newState.results[ele.id] = ele)
            return newState
        }

        default:
            return state
    }
}
