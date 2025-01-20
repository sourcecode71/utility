const Joi = require('joi');
const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        maxlength: 5
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

const Country = mongoose.model('Country', CountrySchema);


function validateCountry(country) {
    const schema = Joi.object().keys({
        code: Joi.string().max(5).required(),
        name: Joi.string().min(5).max(255).required()
    });

    return schema.validate(country);
};

exports.Country = Country;
exports.CountrySchema = CountrySchema;
exports.validate = validateCountry;