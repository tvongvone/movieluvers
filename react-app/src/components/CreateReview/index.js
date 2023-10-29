import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { createMovieReview } from "../../store/reviews"
import { useDispatch } from "react-redux"
import ReactStars from 'react-rating-stars-component'

const CreateReview = ({id}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [reviewText, setReview] = useState('')
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])
    const [stars, setStars] = useState(0)

    const submitHandler = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        if(validationErrors.length) return "Your review has errors"

        const data = await dispatch(createMovieReview({movieId: id, review: reviewText, rating: stars}))

        if(data) {
            setErrors(data)
        } else {
            setSubmitted(false)
            setErrors([])
            setReview('')
            setStars(0)
        }


    }

    useEffect(() => {
        const errors = []
        if (!reviewText) errors.push('Please enter a name for this Watchlist')
        setErrors(errors)
    }, [reviewText])


    return (
        <div className='add-review'>
                <form onSubmit={submitHandler} className='form-review'>
                    <div style={{display: 'flex', alignContent: 'center', width: '100%', justifyContent: 'center', marginLeft: '60px'}}>
                            <div style={{display:'flex', flexDirection:'column', position:'relative', width: '100%'}}>
                            <div style={{'marginBottom':'10px'}}>
                            <ReactStars size={20} count={5} isHalf={false} activeColor='yellow' color='white'
                                emptyIcon={<i className="far fa-star" />}
                                filledIcon={<i className="fa fa-star" />} value={stars} onChange={e => setStars(e)}/>
                                </div>
                                {hasSubmitted && validationErrors.length > 0 && (
                                    <label style={{color: 'red', top: '5px'}}>Please provide a brief review(0, 1000) characters.</label>
                                )}
                                <textarea style={{color: 'white',backgroundColor:'#111', height: '100px', width: '92%'}} value={reviewText} onChange={e => setReview(e.target.value)} placeholder='Add a review' />
                            </div>

                    </div>

                    <button className="create-review-button" type='submit'>Post</button>
                </form>
        </div>
    )
}


export default CreateReview
