const express = require("express");
const router = express.Router();
const { Users, schema: userSchema } = require("../model/users");
const Joi = require("Joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = router;
