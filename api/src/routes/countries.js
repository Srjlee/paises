const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Country } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const datos = await Country.findAll();
    if (!datos.length) {
      console.log(datos);
      const paises = await axios("https://restcountries.com/v3/all");
      const countries = paises.data.map((c) => {
        return {
          name: c.name.common != null ? c.name.common : "No se encontro nombre",
          id: c.cca3,
          flag: c.flags != null ? c.flags[0] : "No se encontro bandera",
          region: c.region != null ? c.region : "No se encontro region",
          capital: c.capital != null ? c.capital[0] : "No se encontro capital",
          subregion: c.subregion,
          area: c.area,
          population: c.population,
        };
      });
      await Country.bulkCreate(countries);
    } else {
      res.json(datos);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
