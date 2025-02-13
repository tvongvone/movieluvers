import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { editMovieReview } from "../../store/reviews"

const EditReview = ({review}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const [reviewText, setReview] = useState(review.review)
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])

    const submitHandler = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        if(validationErrors.length) return "Your review has errors"

        const data = await dispatch(editMovieReview({reviewId: review.id, review: reviewText}))

        if(data) {
            setErrors(data)
        } else {
            setSubmitted(false)
            setErrors([])
            setReview('')
            closeModal()
        }


    }

    useEffect(() => {
        const errors = []
        if (!reviewText) errors.push('Please provide a name for this Watchlist')
        setErrors(errors)
    }, [reviewText])


    return (
        <div className='add-review'>
                <form onSubmit={submitHandler} className='form-review'>

                    {hasSubmitted && validationErrors.length > 0 && (
                        <label style={{color: 'red'}}>Please provide a brief review(0,255) characters.</label>
                    )}
                    <textarea style={{marginLeft: '23px', width: '400px', height: '100px'}} value={reviewText} onChange={e => setReview(e.target.value)} placeholder='Add a review' />
                    <button className="create-review-button" type='submit'>Post Review</button>
                </form>
        </div>
    )
}


export default EditReview
