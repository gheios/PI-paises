import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getActivity, getCountries, postActivity } from '../actions/index'
import '../css/SearchBar.css'
import '../css/CreateActivity.css'


 
function valida(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    return errors;
}

function CreateActivity() {
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector(state => state.countries).sort((a, b) => {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    })

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [],
        
    })

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivity())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        })
        setErrors(valida({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(id) {
        setInput({
            ...input,
            countries: [...input.countries, id.target.value]
        })
    }

    function handleSeason(e) {
        setInput({
            ...input,
            season: e.target.value
        })
    }

    function handleSelctDifficulty(e) {
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }

    function handleSelectDuration(e) {
        setInput({
            ...input,
            duration: e.target.value
        })
    }

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postActivity(input))

       /*  alert('enviado') */
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: [],
         
        })
        history.push('/countries')
       
    }
    console.log(input.countries)
  

    const season = ['Verano', 'Otoño', 'Invierno', 'Primavera'];
    const difficulty = [1, 2, 3, 4, 5];
    const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    return (
        <div className='createContainer' >
            <div >
                <div>
                    <h2 className='tituloAdd'>Creemos una actividad</h2>
                    <div>
                        <form onSubmit={handleSubmit} >
                            <div className='formContainer'>
                                <label className='labelAdd'>Activity: </label>
                                <input   className='addSelect' type="text" value={input.name} name="name" onChange={handleChange} placeholder="Activity name..."  />
                                {errors.name && (
                                    <p>{errors.name}</p>
                                )}
                            </div>
                            <div  className='formContainer'>
                                <label className='labelAdd'>Season: </label>
                                <select onChange={handleSeason} required  className='addSelect'>
                                    <option value="" hidden>Select season</option>
                                    {season.map(e => (
                                        <option value={e} name="season" key={e} >{e}</option>
                                    ))}
                                </select>
                            </div>
                            <div  className='formContainer'>
                                <label className='labelAdd'>Difficulty: </label>
                                <select onChange={handleSelctDifficulty} required   className='addSelect' >
                                    <option value="" hidden>Choose an option</option>
                                    {difficulty.map(e => (
                                        <option value={e} name="difficulty">{e}</option>
                                    ))}
                                </select>
                            </div>
                            <div  className='formContainer'>
                                <label className='labelAdd'>Duration: </label>
                                <select onChange={handleSelectDuration} required  className='addSelect'>
                                    <option value="" hidden>Choose an option</option>
                                    {duration.map(e => (
                                        <option value={e} name="duration">{e}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='formContainer' >
                                <label className='labelAdd'>Country: </label>
                                <select onChange={handleSelect} required  className='addSelect'>
                                    <option value="" hidden>Select country</option>
                                    {countries.map(e => (
                                        <option value={e.id} id={e.name}   key={e.id} >{e.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='PaisContainer'>
                                <ul>{input.countries.map(i =>

                                            <li onClick={() => handleDelete(i)} className="buttonInput btton" type='button'>{i}</li>
                                        )}
                                </ul>  
                            </div>  
                   {/* <Link to="/countries">         <button className='buttonInput' type="button">Volver</button>             </Link> */}
                            <button className='buttonInput' type="submit">Añadir actividad</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateActivity