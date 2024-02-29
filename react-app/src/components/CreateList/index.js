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
        if (!name.length) errors.push('Please provide a name for this Watchlist')
        setErrors(errors)
    }, [name])




    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width: '400px', height: '200px'}}>
            <h2>Watchlists</h2>
            {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors-info'>
                        <ul>
                            {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            <form className="form-review" onSubmit={submitHandler}>
                <input style={{padding: '10px', margin: '10px', width: '80%' }} id='name' name='name' type='text' value={name} onChange={e => setName(e.target.value)} />
                <button className="create-review-button" type='submit'>Create list</button>
            </form>
        </div>
    )
}

export default CreateList
