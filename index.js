const inquirer = require("inquirer");
const sequelize = require("./config/connection");
const table = require("console.table");

const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Role = require("./models/Role");
const { afterUpdate } = require("./models/Department");

// sequelize.query(`SET FOREIGN_KEY_CHECKS = 0`);
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
      // console.log(tables);
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
    try {
      const tableData = await Department.findAll();
      let tables = tableData.map((Department) =>
        Department.get({ plain: true })
      );
      // console.log(tables);
      tables = tables.map((each) => {
        return {
          name: each.name,
          value: each.id,
        };
      });
      // console.log(table);
      // console.log(tables);

      const getRole = await inquirer.prompt([
        {
          type: "input",
          message: "What is the title of the role would you like to add?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department is the new role in?",
          choices: tables,
          name: "department_id",
        },
      ]);
      // console.log(getRole);

      const insertRole = await Role.create(getRole);
    } catch (err) {
      console.log(err);
    }
    startProgram();
  }

  if (answers.actionChosen === "Add an employee") {
    sequelize.query(`SET FOREIGN_KEY_CHECKS = 0`);
    try {
      const tableData = await Role.findAll();
      let tables = tableData.map((Role) => Role.get({ plain: true }));
      // console.log(tables);
      tables = tables.map((each) => {
        return {
          name: each.title,
          value: each.id,
        };
      });
      const managerData = await Employee.findAll({
        where: { manager_id: null },
      });
      let managers = managerData.map((Employee) =>
        Employee.get({ plain: true })
      );
      // console.log(managers);
      managers = managers.map((each) => {
        return {
          name: each.first_name + " " + each.last_name,
          value: each.id,
        };
      });
      // console.log(managers);
      const getEmployee = await inquirer.prompt([
        {
          type: "input",
          message:
            "What is the first name of the employee would you like to add?",
          name: "first_name",
        },
        {
          type: "input",
          message:
            "What is the last name of the employee would you like to add?",
          name: "last_name",
        },
        {
          type: "list",
          message: "What is the employee's role?",
          choices: tables,
          name: "role_id",
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          choices: managers,
          name: "manager_id",
        },
      ]);
      console.log(getEmployee);
      const insertEmployee = await Employee.create(getEmployee);
    } catch (err) {
      console.log(err);
    }
    startProgram();
  }
  if (answers.actionChosen === "Update an employee role") {
    try {
      const tableData = await Employee.findAll();
      let tables = tableData.map((Employee) => Employee.get({ plain: true }));
      // console.log(tables);
      tables = tables.map((each) => {
        return {
          name: each.first_name + " " + each.last_name,
          value: each.id,
        };
      });

      const roleData = await Role.findAll();
      let roles = roleData.map((Role) => Role.get({ plain: true }));
      // console.log(roles);
      roles = roles.map((each) => {
        return {
          name: each.title,
          value: each.id,
        };
      });
      const updateEmployee = await inquirer.prompt([
        {
          type: "list",
          message: "Which employee's role would you like to update?",
          choices: tables,
          name: "employeeUpdate",
        },

        {
          type: "list",
          message: "What role would you like to assign the employee?",
          choices: roles,
          name: "updatedRole",
        },
      ]);
      console.log(updateEmployee);
      const update = await Employee.update(
        {
          role_id: updateEmployee.updatedRole,
        },
        {
          where: {
            id: updateEmployee.employeeUpdate,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    startProgram();
  }
  if (answers.actionChosen === "EXIT PROGRAM") {
    process.exit(0);
  }
}

module.exports = startProgram;
