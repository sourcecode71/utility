const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { validate, Posts } = require("../../models/UserPosts/Posts");


router.get('/', async (req, res)=>{
  const posts = await Posts.find().sort('createdAt');
  res.send(posts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userPost = new Posts(
    _.pick(req.body, [
      "postVideoUrl",
      "postImageUrl",
      "postType",
      "user",
      "desc",
    ])
  );

  const rspPost = await userPost.save();
  return res.send(rspPost);
});

module.exports = router;
