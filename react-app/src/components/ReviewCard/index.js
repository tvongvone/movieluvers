import './review.css'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'


const ReviewCard = ({review}) => {
    const user  = useSelector(state => state.session.user)

    return review && (
        <div className='review-container'>
            <div className='review-header'>
                <h2 className='profile-name'>{review.user.username[0]}</h2>
                <h3>A review by {review.user.username}</h3>
                {user?.id === review.userId && (
                    <div>
                        <div className='icons'>
                        <OpenModalButton styleOption={'edit-pen'} buttonText={<i className="fa-solid fa-pencil"></i>}/>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                    </div>
                )}
            </div>
            <p style={{margin: '10px 80px'}}>{review.review}</p>
        </div>
    )
}


export default ReviewCard
