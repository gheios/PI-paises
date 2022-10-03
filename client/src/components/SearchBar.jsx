import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getNameCountrie } from "../actions";
import '../css/SearchBar.css'

export default function SearchBar(){

    const dispatch = useDispatch();

    const [name, setName] = useState("");

   function handleInputChange(e){ //setea los cambios que escriba el usuario en el input
       e.preventDefault();
       setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameCountrie(name)); //despacha el estado local, que sera lo que escribe el usuario al buscar con el boton
        setName("")
    }

    return(
        <div className="barContainer">
            <input 
               className="buscador"
               value={name}
               type="input"
               placeholder="Buscar Pais..."
               onChange={(e) => handleInputChange(e)}
            />
            <button className="button-Page button2" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )

}