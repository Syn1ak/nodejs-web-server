const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const Roles = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(Roles.Admin, Roles.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(Roles.Admin, Roles.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(Roles.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
