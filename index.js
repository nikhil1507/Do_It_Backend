const express = require('express');
const app = express();
const mongoose = require('mongoose')
const task = require('./routes/task.js')


mongoose.connect('mongodb://localhost')
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err))


app.use(express.json());
app.use('/add', task)



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})