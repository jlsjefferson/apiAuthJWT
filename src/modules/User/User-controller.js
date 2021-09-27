const Util = require("../../utils/Utils");
const UserModel = require("./User-models");

const util = new Util();

/**
 * The UserController.
 *
 * @method index  store
 * @method findUser  findUser
 * @method store  store
 * @method update  update
 */

class UserController {
  async index(req, res) {
    const users = await UserModel.getAll();
    return res.json(users);
  }

  async findUser(req, res) {
    try {
      const id = req.params.id;
      const user = await UserModel.getByID(id);
      if (user == undefined) {
        res.status(404);
        res.json({ message: "user not found" });
      } else {
        res.json(user);
      }
    } catch (error) {}
  }

  async store(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const data = await UserModel.Store(username, email, password, role);

      if (!data) {
        util.setSuccess(200, data);
      }

      return util.send(res);
    } catch (err) {
      util.setError(400, err.message);
      return util.send(res);
    }
  }

  async update(req, res) {
    try {
      const { id, email, username, role } = req.body;
      const data = await UserModel.updateUser(id, email, username, role);
      if (!data) {
        util.setSuccess(200, data);
      }
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async remove(req, res){
    try {
      const id = req.params.id;
      const data = await UserModel.delete(id)

      if(data.status){
        res.status(200)
        res.send("Sucess OK")
      }
      else {
        res.status(406);
        res.send(data.err);
      }
    } catch (error) {
      util.setError(500, error.message);
      return util.send(res);
    }
  }
}

module.exports = UserController;
