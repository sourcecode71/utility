const Joi = require("joi");
const mongoose = require("mongoose");

const PostTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:2,
    maxlength: 50,
  },
  descriptios: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  
});

const PostsType = mongoose.model("PostType", PostTypeSchema);

function validatePostType(postType) {
  const schema = Joi.object().keys({
    descriptios: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(postType);
}

exports.PostsType = PostsType;
exports.PostTypeSchema = PostTypeSchema;
exports.validate = validatePostType;
