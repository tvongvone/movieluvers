import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { createWatchList } from "../../store/watchlists"



const CreateList = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])

    const {closeModal} = useModal()


    const submitHandler = async (e) => {
        e.preventDefault()


        setSubmitted(true)
        if(validationErrors.length) return "Your post has errors"




        const data = await dispatch(createWatchList({name}))
        if(data) {
            setErrors(data)
        } else {
            setName("")
            setErrors([])
            setSubmitted(false)
            closeModal()
        }
    }

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Please enter a name for this Watchlist')
        setErrors(errors)
    }, [name])




    return (
        <div className="form-container">
            <h2>Enter a name for this list</h2>
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
                <input id='name' name='name' type='text' value={name} onChange={e => setName(e.target.value)} />
            </form>
        </div>
    )
}

export default CreateList
