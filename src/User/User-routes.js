const router = require("express").Router();

const UserController = require("./User-controller");

const userController = new UserController();

router
  .post("/user", userController.store)
  .get("/user", userController.index)
  .get("/user/:id", userController.findUser)
  .put("/user", userController.update)
  .delete("/user/:id",userController.remove)
module.exports = router;
