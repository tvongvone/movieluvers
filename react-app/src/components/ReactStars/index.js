import './reactstars.css'
import {FaStar} from 'react-icons/fa'
import { useState } from 'react'


export default function ReactStars({stars}) {

    const [rating, setRating] = useState(stars);
    const [hover, setHover] = useState(null)


    return (
        <div className="star-component">
            {[...Array(5)].map((star, index) => {
                const rating = index + 1
                return (
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
                )

            })}
            <p>You gave it a {rating}</p>
        </div>
    )
}
