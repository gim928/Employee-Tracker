const sequelize = require("../config/connection");

const { Department, Role, Employee } = require("../models");

const deptSeedData = require("./deptSeedData.json");
const roleSeedData = require("./roleSeedData.json");
const employeeSeedData = require("./employeeSeedData.json");

sequelize.query(`SET FOREIGN_KEY_CHECKS = 0`);
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const departments = await Department.bulkCreate(deptSeedData);
    // for (const { id } of departments) {
    //   const newRole = await Role.create({
    //     department_id: id,
    //   });
    // }

    const roles = await Role.bulkCreate(roleSeedData);

    const employees = await Employee.bulkCreate(employeeSeedData);

    // for (const employee of employeeSeedData) {
    //   const newEmployee = await Employee.create({
    //     ...employee,
    //     // Attach a random department ID to each employee
    //     department_id:
    //       departments[Math.floor(Math.random() * departments.length)].id,
    //     role_id: roles[Math.floor(Math.random() * roles.length)].id,
    //   });
    // sequelize.query(`SET FOREIGN_KEY_CHECKS = 1`);
    // }
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

seedDatabase();
