import {
  CREATE_DOG,
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  SEARCH_DOG_NAME,
  ORDER_ALPHABETICAL,
  ORDER_WEIGHT,
  FILTER_TEMPERAMENTS,
  FILTER_DATA_DOGS,
  DOG_DETAIL,
  CLEAR_DETAIL,
  CLEAR_DOGS
} from "../actions";

const initialState = {
  dogs: [],
  dogsAux: [],
  dogDetail: {},
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DOG_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        dogsAux: action.payload
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_DATA_DOGS:
      if (action.payload === "TODOS") {
        return {
          ...state,
          dogs: state.dogsAux,
        };
      }
      let filterData;
      if (action.payload === "API") {
        filterData = state.dogsAux.data.filter((e) => e.id <= 300);
      }
      if (action.payload === "DB") {
        filterData = state.dogsAux.data.filter((e) => e.id.length > 6);
      }
      return {
        ...state,
        dogs: { ...state.dogs, data: filterData },
      };
    case FILTER_TEMPERAMENTS:
      if (action.payload === "TODOS") {
        return {
          ...state,
          dogs: state.dogsAux,
        };
      }
      let result = state.dogsAux.data.filter((e) =>
        e.temperamento.includes(action.payload)
      );
      
      return {
        ...state,
        dogs: { ...state.dogs, data: result },
      };
    case ORDER_ALPHABETICAL:
      let orderAZ;
      if (action.payload === "AZ" || action.payload === "TODOS") {
        orderAZ = state.dogs.data.sort((a, b) => {
          if (a.nombre > b.nombre) return 1;
          if (b.nombre > a.nombre) return -1;
          return 0;
        });
      }
      if (action.payload === "ZA") {
        orderAZ = state.dogs.data.sort((a, b) => {
          if (b.nombre > a.nombre) return 1;
          if (a.nombre > b.nombre) return -1;
          return 0;
        });
      }
      return {
        ...state,
        dogs: { ...state.dogs, data: orderAZ },
      };
    case ORDER_WEIGHT:
      let orderWEIGHT;
      if (action.payload === "MAX") {
        orderWEIGHT = state.dogs.data.sort((a, b) => b.pesoMax - a.pesoMax);
      }
      if (action.payload === "MIN") {
        orderWEIGHT = state.dogs.data.sort((a, b) => a.pesoMax - b.pesoMax);
      }
      return {
        ...state,
        dogs: { ...state.dogs, data: orderWEIGHT },
      };
    case DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload.data,
      };
    case CLEAR_DETAIL:
      //console.log("ClearDetail", action);
      return {
        ...state,
        dogDetail: {},
      };
    case CLEAR_DOGS:
      //console.log("ClearDogs", action);
      return {
        ...state,
        dogs: {},
      };
      case CREATE_DOG:
        return state;
    default:
      return state;
  }
};

export default rootReducer;
