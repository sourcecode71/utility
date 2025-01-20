const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "is already taken." });

userSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000),
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(3).max(100).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
