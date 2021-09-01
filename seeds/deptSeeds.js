const sequelize = require("../config/connection");

const Department = require("../models/Department");

const deptSeedData = require("./deptSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Department.bulkCreate(deptSeedData);
  process.exit(0);
};

// seedDatabase();
