import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { createMovieReview } from "../../store/reviews"
import { useDispatch } from "react-redux"

const CreateReview = ({id}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [reviewText, setReview] = useState('')
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])

    const submitHandler = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        if(validationErrors.length) return "Your review has errors"

        const data = await dispatch(createMovieReview({movieId: id, review: reviewText}))

        if(data) {
            setErrors(data)
        } else {
            setSubmitted(false)
            setErrors([])
            setReview('')
        }


    }

    useEffect(() => {
        const errors = []
        if (!reviewText) errors.push('Please enter a name for this Watchlist')
        setErrors(errors)
    }, [reviewText])


    return (
        <div className='add-review'>
            <h2 className='profile-name'>{user.username[0]}</h2>
                <form onSubmit={submitHandler} className='form-review'>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <label style={{color: 'red'}}>Please provide a brief review(0, 255) characters.</label>
                    )}
                    <textarea value={reviewText} onChange={e => setReview(e.target.value)} placeholder='Add a review' />
                    <button type='submit'>Submit</button>
                </form>
        </div>
    )
}


export default CreateReview
