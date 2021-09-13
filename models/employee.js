const { Model, DataTypes } = require("sequelize");
//object destructuring to only pull those two variables out of sequelize library
const sequelize = require("../config/connection");

// Create a new Sequelize model for dept
class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
        key: "id",
      },
    },
    // department_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "departments",
    //     key: "id",
    //   },
    // },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "employees",
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

module.exports = Employee;
