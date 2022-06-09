const { Router } = require('express');
const {Dog,Temperament} = require("../db")
const {randomImg} = require('../controllers/dogs');

const router = Router()

router.post("/",async (req,res,next)=>{
    try {

        const { nombre, alturaMax , alturaMin , pesoMax , pesoMin , añosDeVida , img , temperamento } = req.body
        //console.log("De que manera llega la info del form: ",req.body)
        const newDog = await Dog.create({

            nombre:nombre,

            altura_max:alturaMax,

            altura_min:alturaMin,

            peso_max:pesoMax,

            peso_min:pesoMin,

            años_de_vida:añosDeVida,

            imagen: img || randomImg(),

        });
        // 
        const temperamentNewDog = await Temperament.findAll({where: {name :temperamento.split(", ")}})

        newDog.addTemperament(temperamentNewDog)

        res.send(`${nombre} se agrego correctamente `)
    } catch (error) {

        next(error)
    }

})

module.exports = router;