const { Model, DataTypes } = require("sequelize");
//object destructuring to only pull those two variables out of sequelize library
const sequelize = require("../config/connection");

// Create a new Sequelize model for dept
class Department extends Model {}

Department.init(
  {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Link to database connection
    sequelize,
    underscored: true,
  }
);

module.exports = Department;
