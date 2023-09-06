const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const app = express();
require("dotenv").config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use('/users', userRoutes)


const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
