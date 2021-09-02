const { Model, DataTypes } = require("sequelize");
//object destructuring to only pull those two variables out of sequelize library
const sequelize = require("../config/connection");

// Create a new Sequelize model for dept
class Role extends Model {}

Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.DECIMAL,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "department_id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
  }
);

module.exports = Role;
