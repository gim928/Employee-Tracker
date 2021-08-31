const inquirer = require("inquirer");
// const express = require("express");
// const db = require("./server.js");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "workplace_db",
  },
  console.log(`Connected to the workplace_db database.`)
);
async function startProgram() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
      name: "actionChosen",
    },
  ]);

  if (answers.actionChosen === "View all departments") {
    db.query("SELECT * FROM department", function (err, results) {
      console.log(results);
    });
  }
  if (answers.actionChosen === "View all roles") {
    db.query("SELECT * FROM role", function (err, results) {
      console.log(results);
    });
  }
  if (answers.actionChosen === "View all employees") {
    db.query("SELECT * FROM employee", function (err, results) {
      console.log(results);
    });
  }
  if (answers.actionChosen === "Add a department") {
    //prompt asking for input on department name
    var sql = "INSERT INTO department (name) VALUES (`${}`)";
  }
  if (answers.actionChosen === "Add a role") {
  }
  if (answers.actionChosen === "Add an employee") {
  }
  if (answers.actionChosen === "Update an employee role") {
  }
}
module.exports = startProgram;
