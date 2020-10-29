const express = require("express");
const router = express.Router();
const { Users, schema: userSchema } = require("../model/users");
const Joi = require("Joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { pick } = require("lodash");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const hashed = user.password;
  const isChecked = await bcrypt.compare(req.body.password, hashed);

  if (!isChecked) return res.send("Email or password is invalid").status(401);

  const picked = _.pick(user, ["name", "email", "_id"]);

  res.send("Welcome" + picked.name);
});

module.exports = router;
