const Joi = require("joi");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostShema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    postType: [{ type: Schema.Types.ObjectId, ref: "PostType" }],
    postVideoUrl: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 100000,
    },
    postImageUrl: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 100000,
    },

    desc: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 250,
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", PostShema);

function validationPosts(posts) {
  const schema = Joi.object().keys({
    postType: Joi.objectId(),
    postVideoUrl: Joi.string(),
    postImageUrl: Joi.string(),
    user: Joi.objectId().required(),
    desc: Joi.string().min(10).max(250).required(),
  });

  return schema.validate(posts);
}

exports.Posts = Posts;
exports.validate = validationPosts;
