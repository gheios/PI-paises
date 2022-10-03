 import React, { Fragment } from 'react'
 import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getCountries, OrdenarName, OrdenarPoblacion,byContinent, getActivity, byActivity, clearDetail, guardaPage} from '../actions/'
import Card from './Card';
import  Paginado from './Paginado'
import '../css/Nav.css'
import '../css/Cards-container.css'
import SearchBar from './SearchBar';



 export default function Home() {
   
  const dispatch= useDispatch();
  const pagina =useSelector(state => state.page)
  const allCountries =useSelector((state)=>state.countries)
  const activity = useSelector(state => state.allActivities)

  const myCountry =useSelector((state)=> state.detail)
  console.log("detail")
console.log(myCountry)
  //paginado
  function handlerPrev(){
   if(currentPage <= 1) return;
   paginado(currentPage - 1);
}


function  handlePage () {
  
   dispatch(guardaPage(currentPage))
 
 }
function handlerNext(){
   if(currentPage >= maximo) return;
   paginado(currentPage + 1);
}
function handleSortName (e){
   e.preventDefault();
   dispatch(OrdenarName(e.target.value))
   setCurrentPage(1);
   setOrden(`ordenado ${e.target.value}`)
}
function handlerSortPopulation(e){
   e.preventDefault();
   dispatch(OrdenarPoblacion(e.target.value))
   setCurrentPage(1);
   setOrden(`ordenado ${e.target.value}`)
}
function handleContinents(e) {
   e.preventDefault();
   dispatch(byContinent(e.target.value))
   setCurrentPage(1);
   setOrden(`ordenado ${e.target.value}`)
}
function handleActivity(e) {
   e.preventDefault();
   dispatch(byActivity(e.target.value))
   setCurrentPage(currentPage);
   setOrden(`ordenado ${e.target.value}`)
   
}

  const [orden, setOrden]= useState(' ')
  const [currentPage, setCurrentPage] = useState(pagina);  //con este estado local me guardo la pagina actual, arrancando en la 1

  const [countriesPerPage, setCountriesPerPage] = useState(10); //con este estado local me guardo cuantos videojuegos tendre por pagina

  const indexOfLastCountrie = currentPage * countriesPerPage; //indice del ultimo personaje

  const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage; //indice del primer personaje

  const currentCountries = allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie); //tomo todos los juegos y selecciono los juegos que quiero, en este caso el indice del primero al ultimo indice con las variables creadas 1 al 15

  const maximo =allCountries.length / countriesPerPage

const  paginado=(pagNumber)=>{
   setCurrentPage(pagNumber)
}


  useEffect(()=>{
   dispatch(getCountries())
   dispatch(getActivity())
   dispatch(byActivity())
   return(()=>{
      dispatch(clearDetail())
   })
  },[dispatch]
  )
  return(
   <div className='nav'>
      <div>
         <SearchBar/>
      </div>
      <div >
      <Link to={'/countries'} class="link">
         <h5 className='titulo'>Paises</h5>
      </Link>
<div className='addContainer'>
      <Link to='/activities'>
                           <button className='buttonAdd'>Añadir actividad</button>
                        </Link></div>
   <div className='filtros-container'>
      <div className='containers'>
         <label>orden alfabetico</label>
         <select  placeholder='orden alfabetico'  className='select' onChange={e=> handleSortName(e)}>
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
         </select>
      </div>
      <div className='containers'>
      <label>orden poblacional</label>
      <select  placeholder='orden poblacional' className='select' onChange={e=> handlerSortPopulation(e)}>
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
         </select>
      </div>
      <div className='containers'>
      <label>por continentes</label>
      <select   className='select' onChange={e =>handleContinents(e)}>
      <option value='All' key='All'>todos los continentes</option>
                        <option value='Africa' key='Africa'>Africa</option>
                        <option value='Antarctica' key='Antarctica'>Antarctica</option>
                        <option value='Asia' key='Asia'>Asia</option>
                        <option value='Europe' key='Europe'>Europe</option>
                        <option value='North America' key='NorthAmerica'>North America</option>
                        <option value='Oceania' key='Oceania'>Oceania</option>
                        <option value='South America' key='SouthAmerica'>South America</option>
         </select>
      </div>
      <div className='containers'>
      <label>por actividad turistica</label>
      <select onChange={e=>handleActivity(e)} className="select">
                        <option value='All'>Todas las actividades</option>
                        {activity.map(e => (
                            <option value={e.name} key={e}>{e.name}</option>
                        ))}
                    </select>
                   
      </div>
   </div>
   </div>
   
      


<div className='cards-container'>
   <div  className='paginado-container'>
  <button onClick={handlerPrev} className="button-Page">anterior</button>
 <Paginado
      countriesPerPage={countriesPerPage}
      allCountries={ allCountries.length}
      paginado={paginado}/>
      <button onClick={handlerNext} className="button-Page">siguiente</button>
   </div>
   <div className="grid">
   { 
    currentCountries?.map( (e) =>{
   return(
      <Fragment>
         <Link to={'/detail/'+ e.id} onClick={(e)=>handlePage(e)} >
      <Card name={e.name} img={e.img} continent={e.continent} population={e.population} key={e.id} />
      </Link>

      </Fragment>
   )
})
   }
 
   
</div>

</div>
   
   
   
   </div>
  )


 }
 