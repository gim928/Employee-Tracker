const router = require("express").Router();

const departmentRoutes = require("./departmentRoutes");

// router.use("/departments", departmentRoutes);
// router.use("/roles", roleRoutes);
router.use("/departments", departmentRoutes);

module.exports = router;
