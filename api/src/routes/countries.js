const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country} =require('../db.js')


router.get('/', async (req, res)=>{

try {
    const datos = await Country.findAll()
    if(!datos.length){
        const paises = await axios("https://restcountries.com/v3/all")
        const countries = paises.data.map(c=>{
            return {
            id: c.fifa,
            name: c.name.official,
            continent: c.continent,
            area: c.area,
            capital: c.capital, 
            population: c.population,
            subregion: c.subregion,
            flag: c.flags.png

            } 
            
        })
    res.json(countries)

    }
    
} catch (error) {
    res.status(404).json(error.message)
}

    
})

module.exports = router;