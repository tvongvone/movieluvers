import './reactstars.css'
import {FaStar} from 'react-icons/fa'


export default function ReactStars({rating}) {
    return (
        <div className="star-component">
            {[...Array(5)].map(star => (
                <label>
                    <input
                    type="radio"
                    name="rating"
                    value={rating}
                     />
                    <FaStar size={50} />
                </label>
            ))}
        </div>
    )
}
