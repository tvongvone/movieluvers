import './reactstars.css'
import {FaStar} from 'react-icons/fa'
import { useState } from 'react'


export default function ReactStars() {

    const [rating, setRating] = useState('');
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
                    onMouseEnter={() => setHover(rating)}
                    onMouseLeave={() => setHover(null)} />
                </label>
            ))}
        </div>
    )
}
