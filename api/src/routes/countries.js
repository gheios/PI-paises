const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query
    const allCountries = await Country.findAll({
        include: Activity
    })

    if (name) {
        const byName = await allCountries.filter(i => i.name.toLowerCase().startsWith(name.toLowerCase()))// pasando a minuscula y comparandolo
       if( byName.length) {
            res.json(byName)}
            else{
            res.status(404).send("pais no existe")}
    } else {
        res.json(allCountries)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    let countries

    try {
        if (id.length > 1) {
            countries = await Country.findByPk(id, { include: Activity })

            countries = {
                id: countries.id,
                name: countries.name,
                img: countries.img,
                continent: countries.continent,
                capital: countries.capital,
                subregion: countries.subregion,
                area: countries.area.toLocaleString('en-US'),
                population: countries.population.toLocaleString('en-US'),
                activities: countries.activities.map((e) => {
                    return {
                        id: e.id,
                        name: e.name,
                        difficulty: e.difficulty,
                        duration: e.duration,
                        season: e.season
                    }
                })
            }
        }
        res.json(countries)
    } catch (error) {
        next(error)
    }
    
});

router.get("/countries/name/:name", async (req, res) => {
    const { name } = req.params;
    const condition = name ?
        {
            where: {
                name: {
                    [Op.iLike]: `${name}%`
                }
            }
        }
        : {}
    const results = await Country.findAll(condition);
    res.json(results.length ? results : 'Country not found');
})
module.exports = router;