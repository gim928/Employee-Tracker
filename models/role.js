const { Model, DataTypes } = require("sequelize");
//object destructuring to only pull those two variables out of sequelize library
const sequelize = require("../config/connection");

// Create a new Sequelize model for dept
class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
        key: "id",
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
