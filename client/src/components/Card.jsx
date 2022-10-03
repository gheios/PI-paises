
import React from 'react'
import "../css/Cards.css"


export default function Card({name,img,continent,population}) {
  return (
    <div className='card-container'>
      <section className='card'>
         <div  className='imagen-section'>
         <img src={img} alt="not found"/>
         </div>
         <div className='texto-section'>
         <h3 className='texto'>{name}</h3>
         <h5 className='texto'>{continent}</h5>
         <h5 className='texto'> poblacion: {population.toLocaleString('en-US')}</h5>
         </div>
      </section>


    </div>
  )
}
