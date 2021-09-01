const { Model, DataTypes } = require("sequelize");
//object destructuring to only pull those two variables out of sequelize library
const sequelize = require("../config/connection");

// Create a new Sequelize model for dept
class Employee extends Model {}

Employee.init(
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "role_id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employees",
        key: "employee_id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
  }
);

module.exports = Employee;
