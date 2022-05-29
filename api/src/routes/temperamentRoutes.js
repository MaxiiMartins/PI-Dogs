const { Router } = require('express');
const {getAllTemperamentDb} = require('../controllers/temperament');

const router = Router()

router.get("/",async(req,res,next)=>{
    try {

        const data = await getAllTemperamentDb()
        console.log(data)
        res.send(data)

    } catch (error) {

        next(error)
    }

})

module.exports = router;