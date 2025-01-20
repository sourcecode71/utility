const Joi = require("joi");
const mongoose = require("mongoose");

const UtilityTypeSchema = new mongoose.Schema({
  utilityName: {
    type: String,
    required: true,
    minlength:2,
    maxlength: 50,
  },
  utilityDescription: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  
});

const uType = mongoose.model("utype", UtilityTypeSchema);

function validatePostType(uType) {
  const schema = Joi.object().keys({
    utilityName: Joi.string().min(2).max(50).required(),
    utilityDescription: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(uType);
}

exports.uType = uType;
exports.UtilityTypeSchema = UtilityTypeSchema;
exports.validate = validatePostType;
