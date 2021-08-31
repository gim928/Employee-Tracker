const express = require("express");
const sequelize = require("./config/connection");
const startProgram = require("./index.js");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware for parsing JSON and url encoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

startProgram();
