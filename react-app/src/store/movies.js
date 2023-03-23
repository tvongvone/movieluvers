const GET_ALL_MOVIES = 'movies/GET_ALL_MOVIES'

const getMovies = data => {
    return {
        type: GET_ALL_MOVIES,
        payload: data
    }
}

export const getAllMovies = () => async dispatch => {
    const response = await fetch('api/movies')


    const data = await response.json()
    dispatch(getMovies(data))
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

        default:
            return state
    }
}
