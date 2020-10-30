const Joi = require("joi");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Users, schema: userSchema } = require("../model/users");
const bcrypt = require("bcrypt");

const schema = Joi.object({
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(6).max(250).required(),
  name: Joi.string().min(6).max(50).required(),
});

router.get("/", async (req, res) => {
  const result = await Users.find();
  const resultNew = _.pick(result[0], ["_id", "name", "email"]);
  res.send(resultNew);
});

router.post("/", async (req, res) => {
  const user = new Users({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  const userExist = await Users.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("User already exist");

  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  const result = await user.save();

  const token = await jwt.sign({ ...picked }, "jwtPrivateKey");

  res.header("x-auth-token", token).send(result);
});

module.exports = router;
