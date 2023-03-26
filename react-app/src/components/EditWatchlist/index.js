import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { editForWatchlist } from "../../store/watchlists"
import { useModal } from "../../context/Modal"



const EditWatchlist = ({watchlist}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(watchlist.name)
    const {closeModal} = useModal()
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])

    const submitHandler = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if(validationErrors.length) return 'This has errors'

        const response = await dispatch(editForWatchlist({watchlistId: watchlist.id, name}))

        if(response) {
            setErrors(response)
        } else {
            setSubmitted(false)
            setErrors([])
            setName('')
            closeModal()
        }
    }

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Please enter a name for this Watchlist')
        setErrors(errors)
    }, [name])

    return watchlist && (
        <div>
            <h2>Change name</h2>
            {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors-info'>
                        <ul>
                            {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            <form onSubmit={submitHandler}>
                <input id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
            </form>
        </div>
    )
}

export default EditWatchlist
