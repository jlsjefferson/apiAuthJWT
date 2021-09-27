const router = require("express").Router();
const UserController = require("./User-controller");
const { storeValidator, editValidator } = require("./user-schema");
const { validationMiddleware } = require("../../middlewares/validator");

const userController = new UserController();

router
  .post("/user", validationMiddleware(storeValidator), userController.store)
  .get("/user", userController.index)
  .get("/user/:id", userController.findUser)
  .put("/user", validationMiddleware(editValidator), userController.update)
  .delete("/user/:id", userController.remove);
module.exports = router;
