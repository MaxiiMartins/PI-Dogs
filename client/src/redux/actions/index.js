import axios from "axios"

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const CREATE_DOG = "CREATE_DOG";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const SEARCH_DOG_NAME = "SEARCH_DOG_NAME";
export const ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL";
export const ORDER_WEIGHT = "ORDER_WEIGHT"

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

export const createDog = (payload) =>{

    return async function (dispatch){

        const response = axios.post("http://localhost:3001/dog",payload)

        console.log(response)

        return response;
    }
}

export const orderAlphabetical = (value)=>{
    
    return async function (dispatch){

        return dispatch({type:ORDER_ALPHABETICAL,payload:value})
    }
}
export const orderWeight = (value)=>{
    
    return async function (dispatch){

        return dispatch({type:ORDER_WEIGHT,payload:value})
    }
}

