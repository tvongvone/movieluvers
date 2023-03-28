const GET_WATCHLISTS = 'watchlists/GET_WATCHLIST'
const CREATE_LIST = 'watchlists/CREATE_LIST'
const ADD_MOVIE = 'watchlists/ADD_MOVIE'
const DELETE_LIST = 'watchlists/DELETE_LIST'
const UPDATE_LIST = 'watchlists/UPDATE_LIST'

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

const deleteWatchList = (watchlistId) => {
    return {
        type: DELETE_LIST,
        payload: watchlistId
    }
}

const updateWatchlist = (obj) => {
    return {
        type: CREATE_LIST,
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
    console.log('THIS HAPPENED')
    const response = await fetch('/api/watchlists/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(createList(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json()

        return data.errors
    } else {
        return 'Update watchlist has an unknown error'
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

// Remove a movie from a watchlist
export const removeMovieFromWatchList = (obj) => async dispatch => {
    const response = await fetch(`/api/watchlists/${obj.watchlistId}/remove`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(addMovie(data))
    }
}

// Edit watchlist name
export const editForWatchlist = (obj) => async dispatch => {
    const response = await fetch(`/api/watchlists/${obj.watchlistId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(updateWatchlist(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json()

        return data.errors
    } else {
        return 'Update watchlist has an unknown error'
    }

}


// Delete a watchlist
export const deleteSingleWatchlist = (watchlistId) => async dispatch => {
    const response = await fetch(`/api/watchlists/${watchlistId}/delete`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(deleteWatchList(watchlistId))
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

        case DELETE_LIST: {
            const newState = {...state, myWatchLists: {...state.myWatchLists}}
            delete newState.myWatchLists[action.payload]
            return newState
        }

        default:
            return state
    }
}
