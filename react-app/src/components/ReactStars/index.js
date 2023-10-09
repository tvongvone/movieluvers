import './reactstars.css'
import {FaStar} from 'react-icons/fa'


export default function ReactStars() {
    return (
        <div className="star-component">
            {[...Array(5)].map(star => (
                <FaStar size={50}></FaStar>
            ))}
        </div>
    )
}
