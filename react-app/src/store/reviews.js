const GET_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEWS'

const getReviews = (data) => {
    return {
        type: GET_REVIEWS,
        payload: data
    }
}

const createReview = (data) => {
    return {
        type: CREATE_REVIEW,
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

// Create a review
export const createMovieReview = (obj) => async dispatch => {
    const response = await fetch(`/api/reviews/${obj.movieId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(createReview(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json()

        return data.errors
    } else {
        return 'Server error'
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

        case CREATE_REVIEW: {
            const newState = {...state, movieReviews: {...state.movieReviews}}
            newState.movieReviews[action.payload.id] = action.payload
            return newState
        }

        default:
            return state
    }
}
