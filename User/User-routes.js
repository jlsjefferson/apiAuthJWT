const router = require('express').Router();

const UserController = require('./User-controller');


const userController = new UserController()

router
  .post('/', userController.store)

module.exports = router;
