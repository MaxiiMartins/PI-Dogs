const {Temperament} = require("../db")
const {getAllInfoApi} = require("./dogs")


// cargo todos los temperamentos a la db
const addTemperamentDb = async()=>{

    let arregTemp = []

    const data = await getAllInfoApi()

    data.map(e=>{

        e.temperamento.split(",").

        map(e=>{

            if(!arregTemp.includes(e.trim())){

            arregTemp= [...arregTemp,e.trim()]

            }

        })

        })
        
    arregTemp.sort().map(async(temp)=> await Temperament.findOrCreate({where:{name: temp}}))
}

// fin 

const getAllTemperamentDb = async () =>{

    await addTemperamentDb()

    const data = await Temperament.findAll()

    return data
}

module.exports = getAllTemperamentDb