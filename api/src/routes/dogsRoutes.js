const { Router } = require('express');
const {getAllInfo} = require('../controllers/dogs');


const router = Router();

router.get("/", async (req,res,next)=>{
    try {

        const {name} = req.query

        const dogs = await getAllInfo()

        if(!name) res.send(dogs)

        else {
            
            const found = dogs.filter(e=> e.nombre.toLowerCase().includes(name.toLowerCase()))
            
            found.length > 0
            
            ? res.send(found)
            
            : res.status(404).send({error:"No se encontro ninguna raza con ese nombre"})
        }
        
    } catch (error) {
        
        next(error)
    }

})

//busqueda por req.params.id
router.get("/:id", async (req,res,next)=>{
    try {

        const {id} = req.params
        
        const dogs = await getAllInfo()
        
        const found = dogs.find(e=> `${e.id}` === `${id}`)
        
        if(found) res.send(found)
        
        else res.status(404).send(`${id} es incorrecto`)
    
    } catch (error) {

        next(error)
    }

})
module.exports = router;
