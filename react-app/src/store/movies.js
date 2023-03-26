const GET_ALL_MOVIES = 'movies/GET_ALL_MOVIES'
const GET_SINGLE = 'movies/GET_SINGLE'

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


// Get all the movies
export const getAllMovies = () => async dispatch => {
    const response = await fetch('api/movies')



    if(response.ok) {
        const data = await response.json()
        dispatch(getMovies(data))
    }
}

// Get single movie
export const getSingleMovie = (id) => async dispatch => {
    const response = await fetch(`api/movies/${id}`)

    if(response.ok) {
        const data = await response.json()

        dispatch(getSingle(data))
    }
}

let initialState = {
    allMovies: {},
    singleMovie: {}
}

export default function moviesReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_MOVIES: {
            const newState = {...state, allMovies: {}}
            action.payload.forEach(ele => newState.allMovies[ele.id] = ele)
            return newState
        }
        case GET_SINGLE: {
            const newState = {...state, singleMovie: {}}
            newState.singleMovie = action.payload
            return newState
        }

        default:
            return state
    }
}
