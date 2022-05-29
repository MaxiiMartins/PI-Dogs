import { CREATE_DOG, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, SEARCH_DOG_NAME, ORDER_ALPHABETICAL,ORDER_WEIGHT} from "../actions";

const initialState = {
    dogs: [],
    allDogs:[],
    dogDetail: {},
    temperaments:[]
  };

const rootReducer = (state = initialState,action)=>{
    switch (action.type) {
        case SEARCH_DOG_NAME:
            return {
                ...state,
                dogs:action.payload
            }
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs:action.payload,
                allDogs:action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments:action.payload
            }
        case ORDER_ALPHABETICAL:
            let orderAZ;
            if(action.payload === "AZ" || action.payload === "default"){
                orderAZ = state.dogs.data.sort((a,b)=>{
                    if(a.nombre>b.nombre)return 1
                    if(b.nombre>a.nombre) return -1
                    return 0
                })
            }
            if(action.payload === "ZA"){
                orderAZ = state.dogs.data.sort((a,b)=>{
                    if(b.nombre>a.nombre)return 1
                    if(a.nombre>b.nombre) return -1
                    return 0
                })
            }
            return{
                ...state,
                dogs:{data:orderAZ}
            }
        case ORDER_WEIGHT:
                let orderWEIGHT;
                if(action.payload === "MAX"){
                    orderWEIGHT = state.dogs.data.sort((a,b)=> b.pesoMax - a.pesoMax)
                }
                if(action.payload === "MIN"){
                    orderWEIGHT = state.dogs.data.sort((a,b)=> a.pesoMax - b.pesoMax)
                }
                return{
                    ...state,
                    dogs:{data:orderWEIGHT}
                }
        case CREATE_DOG:
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default rootReducer;