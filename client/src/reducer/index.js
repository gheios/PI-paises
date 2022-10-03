import { postActivity } from "../actions";

 
 
 const  initialState={
    countries:[],
    allCountries:[],
    allActivities:[],
    detail:[],
    page:1
 }

function rootReducer (state= initialState, action){
   switch (action.type) {
      case "GET_COUNTRIES":
      return {
         ...state,
         countries:action.payload,
         allCountries:action.payload,
         allActivities:action.payload,
         detail:action.payload
        
      }
      case "FILTER_BY_NAME":
         let sortArr =action.payload==="asc" ?
         state.countries.sort(function(a,b){
            if(a.name>b.name){
               return 1;
            }
            if(b.name>a.name){
                  return -1;
            }
            return 0;
         }):
         state.countries.sort(function(a,b){
            if(a.name>b.name){
               return -1;
            }
            if(b.name>a.name){
                  return 1;
            }
            return 0;
         })
         return {
            ...state,
            countries:sortArr
         }

         case "FILTER_BY_POPULATION":
         let sortArrPop =action.payload==="asc" ?
         state.countries.sort(function(a,b){
            if(a.population>b.population){
               return 1;
            }
            if(b.population>a.population){
                  return -1;
            }
            return 0;
         }):
         state.countries.sort(function(a,b){
            if(a.population>b.population){
               return -1;
            }
            if(b.population>a.population){
                  return 1;
            }
            return 0;
         })
         return {
            ...state,
            countries:sortArrPop
         }
         case "FILTER_NAME_COUNTRIE": //obtener videojuego por nombre
         return {
             ...state,
            countries: action.payload
         }
         case "BY_CONTINENT":
         const allContinents = state.allCountries
         const continentFilter = action.payload === 'All' ? allContinents :
             allContinents.filter(i => i.continent === action.payload)
         return {
             ...state,
             countries: continentFilter
         }
         case "GET_ACTIVITY":
            return {
                ...state,
               allActivities: action.payload
            }
         case "BY_ACTIVITY":
         
         const allActivity=state.allCountries
         const  ActivityFiltered=action.payload==="All" ? allActivity :
         allActivity.filter(i=>i.activities.some(e=>e.name===action.payload))
         return{
            ...state,
           countries: ActivityFiltered
               
            }
            case "GET_DETAILS":
            return{
               ...state,
               detail:action.payload
            }

            case postActivity:
            return{
               ...state
            }
            case "CLEAR_DETAIL"://Limpiar estado
               return {
                           ...state,
                              countries: action.payload,
                            detail: action.payload
                  }
                  case "GUARDAR_PAGE":
                  return{
                     ...state,
                     page:action.payload
                  }

     default:
      return state;
         }

      }
export default rootReducer;