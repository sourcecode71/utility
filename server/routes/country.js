const auth = require('../middleware/auth');
const {Country, validate}  = require('../models/Standalone/country')
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res)=>{
    const country = await Country.find().sort('name');
    res.send(country);
});

router.post('/', auth, async (req, res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let existCountry = await Country.findOne({ code: req.body.code });
    if (existCountry) return res.status(400).send('Country already registered.');

    let country = new Country({
           code : req.body.code,
           name : req.body.name
    });

    country = await country.save();
    return res.send(country);
});

module.exports = router;