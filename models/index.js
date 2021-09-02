const Employee = require("./Employee");
const Department = require("./Department");
const Role = require("./Role");

Department.hasMany(Employee, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

Employee.belongsTo(Department, {
  foreignKey: "department_id",
});

Department.hasMany(Role, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

Role.hasMany(Employee, {
  foreignKey: "role_id",
});
