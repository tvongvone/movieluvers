const GET_REVIEWS = 'reviews/GET_REVIEWS'

const getReviews = (data) => {
    return {
        type: GET_REVIEWS,
        payload: data
    }
}

// Movie reviews
export const getMovieReviews = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`)

    if (response.ok) {
        const data = await response.json()

        dispatch(getReviews(data))
    }
}

const initialState = {
    movieReviews: {}
}


export default function reviewsReducer(state=initialState, action) {
    switch(action.type) {

        case GET_REVIEWS: {
            const newState = {...state, movieReviews: {}}
            action.payload.forEach(ele => newState.movieReviews[ele.id] = ele)
            return newState
        }

        default:
            return state
    }
}
