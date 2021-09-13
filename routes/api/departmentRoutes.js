const router = require("express").Router();
const { Department, Employee, Role } = require("../../models");

//GET all departments
router.get("/", async (req, res) => {
  try {
    const departmentData = await Department.findAll({
      include: [{ model: Employee }, { model: Role }],
    });
    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single department
router.get("/:id", async (req, res) => {
  try {
    const departmentData = await Department.findByPk(req.params.id, {
      include: [{ model: Employee }, { model: Role }],
    });

    if (!departmentData) {
      res.status(404).json({ message: "No dept found with that id!" });
      return;
    }

    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all employees
router.get("/employees", async (req, res) => {
  try {
    const employeeData = await Employee.findAll({
      include: [{ model: Department }, { model: Role }],
    });
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
