var User = require("../models/user-model")
var Util = require('../utils/Utils');

var util = new Util();

class UserController {
  async index(req, res){}

  async create(req, res) {
    try {
      const {
       name,
       email,
       password,
       role
      } = req.body;
  
      const data = await User(
        name,
        email,
        password,
        role
      );
  
      if (!data) {
        util.setSuccess(200, data);
      }
  
      req.io.emit('update-localizacao');
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}




module.exports = new UserController();