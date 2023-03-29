const GET_ALL_MOVIES = 'movies/GET_ALL_MOVIES'
const GET_SINGLE = 'movies/GET_SINGLE'
const REMOVE_SINGLE = 'movies/REMOVE_SINGLE'

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

let initialState = {
    allMovies: {},
    bestMovies:{},
    singleMovie: {}
}

export default function moviesReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_MOVIES: {
            const newState = {...state, allMovies: {}}
            action.payload.new.forEach(ele => newState.allMovies[ele.id] = ele)
            action.payload.old.forEach(ele => newState.bestMovies[ele.id] = ele)
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

        default:
            return state
    }
}
