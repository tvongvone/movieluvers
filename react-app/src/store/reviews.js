const GET_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE'

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

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        payload: id
    }
}

// Movie reviews
// Average rating of movie
export const getMovieReviews = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`)

    if (response.ok) {
        const data = await response.json()

        let sum = 0;
        for(let i = 0; i < data.length; i++) {
            sum += data[i].rating
        }

        const rating = (sum / data.length).toFixed(1)

        const newData = {
            data: data,
            rating: rating
        }

        dispatch(getReviews(newData))
    }
}

// Create a review
export const createMovieReview = (obj) => async dispatch => {
    const response = await fetch('/api/reviews/new', {
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
        return 'SERVER ERROR HAS OCCURED'
    }
}

// update movie review
export const editMovieReview = (obj) => async dispatch => {
    const response = await fetch(`/api/reviews/${obj.reviewId}/edit`, {
        method: 'PUT',
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
        return 'SERVER ERROR HAS OCCURED'
    }
}


// Delete movie review
export const deleteMovieReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}/delete`, {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(deleteReview(id))
    }
}

const initialState = {
    movieReviews: {},
    rating: 0
}


export default function reviewsReducer(state=initialState, action) {
    switch(action.type) {

        case GET_REVIEWS: {
            const newState = {...state, movieReviews: {}, rating: 0}
            action.payload.data.forEach(ele => newState.movieReviews[ele.id] = ele)
            newState.rating = action.payload.rating
            return newState
        }

        case CREATE_REVIEW: {
            const newState = {...state, movieReviews: {...state.movieReviews}, rating: state.rating}
            newState.movieReviews[action.payload.id] = action.payload
            return newState
        }

        case DELETE_REVIEW: {
            const newState = {...state, movieReviews: {...state.movieReviews}, rating: state.rating}
            newState.rating = parseInt(newState.movieReviews[action.payload].rating) - parseInt(newState.rating)
            delete newState.movieReviews[action.payload]
            return newState
        }


        default:
            return state
    }
}
