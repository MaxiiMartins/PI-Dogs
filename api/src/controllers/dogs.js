const axios = require("axios");
const {Dog,Temperament} = require("../db")
const {API_KEY} = process.env;

// const getAllInfoApiPromise = ()=>{
//    return axios("https://api.thedogapi.com/v1/breeds?api_key=da770a06-df36-4f30-906d-cd89acebb69d")
//   .then(res => res.data)
//   .then(result => result.map((e) => {

//     let altura= e.height.metric.split("-")

//     let peso= e.weight.metric.split("-")
//     // [76]
//     altura.length === 2? [minA,maxA] = altura:[maxA,minA] =altura
//     peso.length === 2? [minP,maxP] = peso:[maxP,minP] =peso

//   // NaN - 32
//   return {
    
//     id: e.id,
    
//     nombre: e.name,
    
//     alturaMax:parseInt(maxA)? parseInt(maxA):35,
    
//     alturaMin:parseInt(minA)?parseInt(minA): Math.ceil(maxA/2) ,
    
//     pesoMax:parseInt(maxP)?parseInt(maxP):32,
    
//     pesoMin:parseInt(minP)?parseInt(minP):Math.ceil(maxP/2),

//     temperamento: e.temperament || "Active, Athletic, Agile, Confident, Fearless, Protective",
    
//     añosDeVida: e.life_span,
    
//     img: e.image.url

//   };
// })).catch(error => console.log(error))
  
// }

const getAllInfoApi = async () => {

    const dataApi = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data

    .map((e) => {
      // 13 - 12
      // 13
        let altura= e.height.metric.split("-")

        let peso= e.weight.metric.split("-")
        // [76]
        altura.length === 2? [minA,maxA] = altura:[maxA,minA] =altura
        peso.length === 2? [minP,maxP] = peso:[maxP,minP] =peso

      // NaN - 32
      return {
        
        id: e.id,
        
        nombre: e.name,
        
        alturaMax:parseInt(maxA)? parseInt(maxA):35,
        
        alturaMin:parseInt(minA)?parseInt(minA): Math.ceil(maxA/2) ,
        
        pesoMax:parseInt(maxP)?parseInt(maxP):32,
        
        pesoMin:parseInt(minP)?parseInt(minP):Math.ceil(maxP/2),
        
        // alturaMax: altura.length >1 ? parseInt(altura[1]):parseInt(altura[0]),
        // alturaMin: altura.length >1 ? parseInt(altura[0]):parseInt(altura[0])/2,
        // pesoMax: peso.length <1? parseInt(peso[0]) : isNaN(parseInt(peso[0]))? parseInt(peso[1]):parseInt(peso[0]),
        // pesoMin: peso.length <1? parseInt(peso[0]) /2 : isNaN(parseInt(peso[0]))? parseInt(peso[1])/2:parseInt(peso[0])/2,
        
        temperamento: e.temperament || "Active, Athletic, Agile, Confident, Fearless, Protective",
        
        añosDeVida: e.life_span, // 12 years 
        
        img: e.image.url

      };

    });

    return dataApi;
};

const getAllInfoDb = async() => {

  let dataDb = await Dog.findAll({

    include:{  
      
      model: Temperament,
      
      attributes:["name"]
      ,
      
      throught:{
          
        attributes:[]
      
      }
    }

  })
  //console.log("Esto es la database!!!! => ",dataDb)
  
  dataDb = dataDb.map(e=>{

    return{

      id:e.id,

      nombre: e.nombre,

      alturaMax: e.altura_max,

      alturaMin: e.altura_min,

      pesoMax: e.peso_max,
      
      pesoMin: e.peso_min,

      añosDeVida: e.años_de_vida,

      img:e.imagen,

      temperamento: e.temperaments.map(e=> e.name).join(", ")

    }

  })

  return dataDb
}

const getAllInfo = async()=>{

  const dataApi = await getAllInfoApi();
  // const dataApi = getAllInfoApiPromise();
  // console.log("data api ",dataApi )
  // const dataDb = await getAllInfoDb();
  // return dataApi.concat(dataDb)

  return getAllInfoDb();
}

const randomImg = ()=>{

  const arrUrl = [
        
    "https://img.freepik.com/vector-gratis/lindo-perro-sentado-dibujos-animados-vector-icono-ilustracion-animal-naturaleza-icono-concepto-vector-aislado_138676-4928.jpg",
  
    "https://img.freepik.com/vector-gratis/lindo-perro-caminando-gafas-cartoon-vector-icono-ilustracion-animal-naturaleza-icono-concepto-aislado_138676-4924.jpg",

    "https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg",

    "https://img.freepik.com/vector-gratis/lindo-perro-labrador-caja-cartoon-vector-icono-ilustracion-animal-naturaleza-icono-concepto-aislado_138676-4327.jpg",

    "https://img.freepik.com/vector-gratis/lindo-labrador-perro-sonrisa-dibujos-animados-vector-icono-ilustracion-animal-naturaleza-icono-concepto-aislado_138676-4329.jpg",
    
  ]
  
  return arrUrl[Math.floor(Math.random()*arrUrl.length)]
}


module.exports = {
  getAllInfo,
  getAllInfoApi,
  getAllInfoDb,
  randomImg
};
