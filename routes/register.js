const Joi = require("joi");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Users, schema: userSchema } = require("../model/users");

const schema = Joi.object({
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(6).max(20).required(),
  name: Joi.string().min(6).max(50).required(),
});

router.get("/", async (req, res) => {
  const result = await Users.find();
  const resultNew = _.pick(result[0], ["_id", "name", "email"]);
  res.send(resultNew);
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  const user = new Users({
    email: req.body.email,
    password: req.body.email,
    name: req.body.name,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
