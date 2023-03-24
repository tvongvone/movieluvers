const GET_WATCHLISTS = 'watchlists/GET_WATCHLIST'
const CREATE_LIST = 'watchlists/CREATE_LIST'
const ADD_MOVIE = 'watchlists/ADD_MOVIE'

const getWatchLists = (data) => {
    return {
        type: GET_WATCHLISTS,
        payload: data
    }
}

const createList = (obj) => {
    return {
        type: CREATE_LIST,
        payload: obj
    }
}

const addMovie = (obj) => {
    return {
        type: ADD_MOVIE,
        payload: obj
    }
}

// Fetch all of the users watchlists
export const getMyWatchlists = () => async dispatch => {
    const response = await fetch('/api/watchlists')



    if (response.ok) {
        const data = await response.json()

        dispatch(getWatchLists(data))
    }

}
// Create a single watchlist
export const createWatchList = (obj) => async dispatch => {
    const response = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {
        const data = await response.json()

        dispatch(createList(data))
        return null

    } else if (response.status < 500) {
        const data = response.json()

        return data.errors
    }else {
        return 'Unknown error'
    }
}

// Add movie to watchlist
export const addMovieToWatchList = (obj) => async dispatch => {
    const response = await fetch(`/api/watchlists/${obj.watchlistId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {

        const data = await response.json()

        dispatch(addMovie(data))
    }


}


const initialState = {
    myWatchLists: {}
}

export default function watchlistReducer(state=initialState, action) {
    switch(action.type) {
        case GET_WATCHLISTS: {
            const newState = {...state, myWatchLists: {}}
            action.payload.forEach(ele => newState.myWatchLists[ele.id] = ele)
            return newState
        }

        case CREATE_LIST: {
            const newState = {...state, myWatchLists: {...state.myWatchLists}}
            newState.myWatchLists[action.payload.id] = action.payload
            return newState
        }

        case ADD_MOVIE: {
            const newState = {...state, myWatchLists: {...state.myWatchLists}}
            newState.myWatchLists[action.payload.id] = action.payload
            return newState
        }

        default:
            return state
    }
}
