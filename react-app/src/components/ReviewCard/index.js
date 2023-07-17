import './review.css'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import { deleteMovieReview } from '../../store/reviews'
import { useDispatch } from 'react-redux'
import EditReview from '../EditReview'


const ReviewCard = ({review}) => {
    const user  = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteMovieReview(review.id))
    }

    return review && (
        <div className='review-container'>
            <div className='review-header'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 className='profile-name'>{review.user.username[0].toUpperCase()}</h2>
                <h3>A review by {review.user.username}</h3>
                <span style={{marginLeft: '10px', fontSize: '14px'}}>{review.rating}/5</span>
                </div>
                {user?.id === review.userId && (
                    <div style={{marginRight: '20px'}}>
                        <div className='icons'>
                        <OpenModalButton modalComponent={<EditReview review={review}/>} styleOption={'edit-pen'} buttonText={<i className="fa-solid fa-pencil"></i>}/>
                        <i onClick={deleteHandler} className="fa-solid fa-trash-can"></i>
                    </div>
                    </div>
                )}
            </div>
            <p style={{margin: '10px 80px', marginBottom: '20px'}}>{review.review}</p>
        </div>
    )
}


export default ReviewCard
