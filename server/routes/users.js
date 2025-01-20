const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  if (!req.user) res.status(400).send("Provide user Id is not found.");

  const user = await User.findById(req.user.id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ Error: "User already registered." });

  user = new User(_.pick(req.body, ["firstName","lastName","email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateJWT();

  console.log(user," user password ",  token);

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id",  "email"]));
});

module.exports = router;
