import axios from "axios"

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const CREATE_DOG = "CREATE_DOG";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const DOG_DETAIL = "DOG_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const SEARCH_DOG_NAME = "SEARCH_DOG_NAME";
export const ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const FILTER_DATA_DOGS = "FILTER_DATA_DOGS";

export const getAllDogs = ()=>{

    return async function(dispatch){

        return(

            axios("http://localhost:3001/dogs")

            .then(data => dispatch({type:GET_ALL_DOGS,payload:data}))

            .catch(error => error)
        )
        
    }
}

export const searchDogName = (name)=>{

    return async function(dispatch){
        
        try {
            const dog = await axios.get(`http://localhost:3001/dogs?name=${name}`)

            return dispatch({type:SEARCH_DOG_NAME,payload:dog})

        } catch (error) {
            
            console.log(error)

            alert("No se encontro resultado")
        }
    }
}

export const getAllTemperaments = ()=>{

    return async function (dispatch){

        try {
            
            const info = (await axios("http://localhost:3001/temperament")).data
            console.log(info)
            const data = info.map(e=>{
            
                return{
                
                    id:e.id,
                
                    name:e.name,
                
                }
            })
        
        return dispatch({type:GET_ALL_TEMPERAMENTS,payload:data})
        
        } catch (error) {

            console.log(error)
        }
    }
}

export const dogDetail = (id) =>{

    return async function (dispatch){

        try {

            const response = await axios.get(`http://localhost:3001/dogs/${id}`)

            return dispatch({type:DOG_DETAIL,payload:response});

        } catch (error) {

            console.log(error)
        }
        
    }
}
export const clearDetail = ()=>{
    return function (dispatch){

        return dispatch({type:CLEAR_DETAIL})
    }
}

export const createDog = (payload) =>{

    return async function (dispatch){

        const response = axios.post("http://localhost:3001/dog",payload)

        console.log(response)

        return response;
    }
}

export const orderAlphabetical = (value)=>{
    
    return function (dispatch){

        return dispatch({type:ORDER_ALPHABETICAL,payload:value})
    }
}
export const orderWeight = (value)=>{
    
    return function (dispatch){

        return dispatch({type:ORDER_WEIGHT,payload:value})
    }
}
export const filterTemperaments = (value)=>{
    
    return function (dispatch){

        return dispatch({type:FILTER_TEMPERAMENTS,payload:value})
    }
}
export const filterDataDogs = (value)=>{
    
    return function (dispatch){

        return dispatch({type:FILTER_DATA_DOGS,payload:value})
    }
}

