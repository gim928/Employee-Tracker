const inquirer = require("inquirer");
const sequelize = require("./config/connection");
const table = require("console.table");

const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Role = require("./models/Role");
// const { findAll } = require("./models/Department");

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
        "EXIT PROGRAM",
      ],
      name: "actionChosen",
    },
  ]);

  if (answers.actionChosen === "View all departments") {
    try {
      const tableData = await Department.findAll();
      const tables = tableData.map((department) =>
        department.get({ plain: true })
      );
      // console.log(table);
      console.table(tables);
    } catch (err) {
      console.log(err);
    }
    startProgram();
  }
  if (answers.actionChosen === "View all roles") {
    try {
      const tableData = await Role.findAll();
      const tables = tableData.map((role) => role.get({ plain: true }));
      // console.log(table);
      console.table(tables);
    } catch (err) {
      console.log(err);
    }
    startProgram();
  }
  if (answers.actionChosen === "View all employees") {
    try {
      const tableData = await Employee.findAll();
      const tables = tableData.map((employee) => employee.get({ plain: true }));
      // console.log(table);
      console.table(tables);
    } catch (err) {
      console.log(err);
    }
    startProgram();
  }
  if (answers.actionChosen === "Add a department") {
    //prompt asking for input on department name
    const getDepartment = await inquirer.prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "newDepartment",
      },
    ]);
    const insertDept = await Department.findOrCreate({
      where: { name: getDepartment.newDepartment },
    });

    startProgram();
  }
  if (answers.actionChosen === "Add a role") {
    const getRole = await inquirer.prompt([
      {
        type: "input",
        message: "What is the title of the role would you like to add?",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "What department is the new role in?",
        choices: [],
        name: "roleDepartment",
      },
    ]);
    const insertRole = await Role.findOrCreate({
      where: { name: getRole.newRole },
    });
    startProgram();
  }
  if (answers.actionChosen === "Add an employee") {
    const getEmployee = await inquirer.prompt([
      {
        type: "input",
        message:
          "What is the first name of the employee would you like to add?",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee would you like to add?",
        name: "employeeLastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        choices: [],
        name: "employeeRole",
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [],
        name: "employeeManager",
      },
    ]);
  }
  if (answers.actionChosen === "Update an employee role") {
    const updateEmployee = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: [],
        name: "employeeUpdate",
      },
      {
        type: "list",
        message: "What role would you like to assign the employee?",
        choices: [],
        name: "updatedRole",
      },

      //model.update?
    ]);
  }
  if (answers.actionChosen === "EXIT PROGRAM") {
    return;
  }
}

module.exports = startProgram;
