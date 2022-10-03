import React from 'react'
import '../css/paginado.css'




export default function Paginado({countriesPerPage,allCountries,paginado}) {
   const pagNumbers=[];
   for(let i =1;i<=Math.ceil(allCountries / countriesPerPage ); i++){
      pagNumbers.push(i)
   }
  return (

    <nav >
      <ul className='paginado'>
      {pagNumbers && pagNumbers.map(number => (
        <li className='number' key={number}>
        <a  onClick={()=>paginado(number)} className="button-Page">{number}</a>
        </li>
       ))}
      </ul>
    </nav>
  )
}
