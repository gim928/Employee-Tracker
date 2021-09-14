const Employee = require("./Employee");
const Department = require("./Department");
const Role = require("./Role");

// Department.hasMany(Employee, {
//   foreignKey: "id",
// });

// Employee.belongsTo(Department, {
//   foreignKey: "id",
// });

Department.hasMany(Role, {
  foreignKey: "department_id",
});

Role.belongsTo(Department, {
  foreignKey: "department_id",
});

Role.hasMany(Employee, {
  foreignKey: "role_id",
});

Employee.belongsTo(Role, {
  foreignKey: "role_id",
});
module.exports = { Department, Role, Employee };
