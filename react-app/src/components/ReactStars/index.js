import './reactstars.css'
import {FaStar} from 'react-icons/fa'
import { useState } from 'react'


export default function ReactStars() {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)


    return (
        <div className="star-component">
            {[...Array(5)].map(star => (
                <label>
                    <input
                    type="radio"
                    name="rating"
                    value={rating}
                    onClick={() => setRating(rating)}
                     />
                    <FaStar
                    className="star"
                    size={50}
                    color={rating <= (hover || rating) ? "#ffc107" : "e4e5e9"}
                    onMouseEnter={() => setHover(rating)}
                    onMouseLeave={() => setHover(null)} />
                </label>
            ))}
            <p>your rating is {rating}</p>
        </div>
    )
}
