const axios = require("axios");
const {Dog,Temperament} = require("../db")

const getAllInfoApi = async () => {

    const dataApi = (await axios(`https://api.thedogapi.com/v1/breeds`)).data

    .map((e) => {

        let altura= e.height.metric.split("-")

        let peso= e.weight.metric.split("-")
        
        let [minA,maxA] = altura
        
        let [minP,maxP] = peso
      
      return {
        
        id: e.id,
        
        nombre: e.name,
        
        alturaMax:parseInt(maxA)? parseInt(maxA):35,
        
        alturaMin:parseInt(minA)?parseInt(minA): 30 ,
        
        pesoMax:parseInt(maxP)?parseInt(maxP):32,
        
        pesoMin:parseInt(minP)?parseInt(minP):28,
        
        // alturaMax: altura.length >1 ? parseInt(altura[1]):parseInt(altura[0]),
        // alturaMin: altura.length >1 ? parseInt(altura[0]):parseInt(altura[0])/2,
        // pesoMax: peso.length <1? parseInt(peso[0]) : isNaN(parseInt(peso[0]))? parseInt(peso[1]):parseInt(peso[0]),
        // pesoMin: peso.length <1? parseInt(peso[0]) /2 : isNaN(parseInt(peso[0]))? parseInt(peso[1])/2:parseInt(peso[0])/2,
        
        temperamento: e.temperament || "Active, Athletic, Agile, Confident, Fearless, Protective",
        
        añosDeVida: e.life_span,
        
        img: e.image.url

      };

    });

    return dataApi;
};

const getAllInfoDb = async() => {

  const dataDb = await Dog.findAll({

    include:{  
      
      model: Temperament,
      
      attributes:["name"],
      
      throught:{
          
        attributes:[]
      
      }

    }

  })
  console.log(dataDb)
  
  dataDb = dataDb.map(e=>{

    return{

      id:e.id,

      nombre: e.nombre,

      alturaMax: altura_max,

      alturaMin: altura_min,

      pesoMax: peso_max,
      
      pesoMin: peso_min,

      añosDeVida: año_de_vida,

      img:imagen,

      temperamento: e.temperaments.map(e=> e.name).join(", ")

    }

  })

  return dataDb
}

const getAllInfo = async()=>{

  const dataApi = await getAllInfoApi();

  const dataDb = await getAllInfoDb();
  
  return dataApi.concat(dataDb)
}

module.exports = {
  getAllInfo,
  getAllInfoApi,
  getAllInfoDb
};
