const express = require("express");
const sequelize = require("./config/connection");
//import models to sync table with database
const Department = require("./models/Department");
const Role = require("./models/Role");
const Employee = require("./models/Employee");
const startProgram = require("./index.js");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware for parsing JSON and url encoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  })
  .then(() => {
    startProgram();
  });
