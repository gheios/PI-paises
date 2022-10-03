import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetail } from "../actions";
import { useEffect } from "react";
import '../css/DetailCountry.css'


export default function DetailCountry(props){
   console.log(props)
   const dispatch =  useDispatch()
  const{id}  =useParams()
  console.log("este es el id:" +id)
useEffect(()=>{
   dispatch(getDetail(id));
   return(()=>{
      dispatch(clearDetail())
   })
},[dispatch,id])

const detail =useSelector((state)=> state.detail)
console.log( detail)

const allActivities =useSelector((state)=>state.allActivities)
 console.log(allActivities)

return(
   <div  className="detailSection">
      {
       
         <div className="DetailContainer"> 
            <img src={detail.img} alt="hola" className="imgFlag" />
            <h1>{detail.name}</h1>
           <p> <b className="textoDetail"> id: </b>{detail.id}</p>
            <p><b className="textoDetail">continentes:</b> {detail.continent}</p>
            <p> <b className="textoDetail">capital:</b> {detail.capital}</p>
            <p> <b className="textoDetail">subregion:</b> {detail.subregion}</p>
            <p> <b className="textoDetail">area :</b> {detail.area}<sup>km2</sup></p>
            <p> <b className="textoDetail">poblacion: </b>{detail.population}</p>
            <div className="activityContainer">
              
               {  detail.activities?.map(e => {
                                       return (
                                          <div key={e.id} className="activity">  
                                          <h4> actividad:</h4>
                                                <p> <b className="textoDetail">Name:</b> {e.name}</p>
                                                <p> <b className="textoDetail">Difficulty: </b>{e.difficulty}</p>
                                                <p> <b className="textoDetail">Duration: </b>{e.duration}</p>
                                                <p> <b className="textoDetail">Season:</b> {e.season}</p>
                                               
                                          </div>
                                       )
                                    })  
                            }  
                            </div><Link to="/countries"> <button className="buttonInput volver">volver</button></Link>
         </div>
                              
                                 }
      

     
   </div>
)
}