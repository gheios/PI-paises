import React from 'react'
import { Link } from 'react-router-dom';
import "../css/LandingPage.css"

 export default function LandingPage ()  {
  return (
    <div>
      <div  className='Landing-Container'>
<div className='tittle-container'>
   <h1 className='titulo-landing'>Bienvenido</h1>

     
      <Link to='./countries'>
        
         <button  class="button-landing" >Ingresar</button>
        
      </Link>
      </div>
      </div>
    </div>
  )
}

