const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const Roles = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(Roles.Admin), usersController.getAllUsers)
  .delete(verifyRoles(Roles.Admin), usersController.deleteUser);

router.route("/:id").get(verifyRoles(Roles.Admin), usersController.getUser);

module.exports = router;
