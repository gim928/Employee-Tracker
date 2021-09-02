const sequelize = require("../config/connection");

const { Department, Role, Employee } = require("../models");

const deptSeedData = require("./deptSeedData.json");
const roleSeedData = require("./roleSeedData.json");
const employeeSeedData = require("./employeeSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(deptSeedData);
  for (const { id } of departments) {
    const newRole = await Role.create({
      department_id: id,
    });
  }

  for (const employee of employeeSeedData) {
    const newEmployee = await Employee.create({
      ...employee,
      // Attach a random department ID to each car
      department_id:
        departments[Math.floor(Math.random() * departments.length)].id,
    });
  }
  process.exit(0);
};

// seedDatabase();
