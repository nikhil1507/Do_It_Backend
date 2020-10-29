const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(5).max(250).required().label("Task"),
});

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    minlength: 5,
    maxlength: 250,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

router.get("/", async (req, res) => {
  const result = await Task.find().sort("task");
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    task: req.body.name,
  });

  const result = await task.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send("Task not found");

  task.task = req.body.name;
  await task.save();
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  res.send(task);
});

module.exports = router;
