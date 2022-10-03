import axios from 'axios'



export  function getCountries() {
  return async function(dispatch) {
    var json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type:'GET_COUNTRIES',
      payload:json.data
    })
  }


}

export function OrdenarName(payload){
  return{
    type: "FILTER_BY_NAME",
    payload
}}
export function OrdenarPoblacion(payload){
  return{
    type: "FILTER_BY_POPULATION",
    payload
}
}
export function  getNameCountrie(payload){

 return async function (dispatch) {
  try {
      let json = await axios.get("http://localhost:3001/countries?name=" + payload); 
      return dispatch({
          type: "FILTER_NAME_COUNTRIE",
          payload: json.data
      })
  } catch (error) {
      console.log(error)
  }
}
}

export function byContinent(payload) {
  return {
      type: "BY_CONTINENT",
      payload
  }
}

export function  getActivity(){

  return async function (dispatch) {
   try {
    let json = await axios.get("http://localhost:3001/activities"); 
       return dispatch({
           type: "GET_ACTIVITY",
           payload: json.data
       })
   } catch (error) {
       console.log(error)
   }
 }
 }

 export function byActivity(payload) {
  return {
      type: "BY_ACTIVITY",
      payload
  }
}
export function postActivity(payload) {
  return async function () {
      try {
          const res = await axios.post('http://localhost:3001/activities', payload)
          return res;
      } catch (error) {
          console.log(error)
      }
  }
}


export function getDetail(id) {
  return async function (dispatch){
    try{
      var json =await axios.get('http://localhost:3001/countries/'+id);
      return dispatch({
        type: "GET_DETAILS",
        payload:json.data
      })
    }catch(error){
      console.log(error)
    }
  }
  
}
export function clearDetail (){
  return {
      type: "CLEAR_DETAIL",
      payload: []
  }
  
}


export function guardaPage(payload){
return function(dispatch){
  return dispatch({
    type:"GUARDAR_PAGE",
    payload
  })
}

}