const GET_WATCHLISTS = 'watchlists/GET_WATCHLIST'

const getWatchLists = (data) => {
    return {
        type: GET_WATCHLISTS,
        payload: data
    }
}

export const getMyWatchlists = () => async dispatch => {
    const response = await fetch('/api/watchlists')


    const data = await response.json()

    dispatch(getWatchLists(data))
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

        default:
            return state
    }
}
