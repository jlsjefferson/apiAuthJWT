const Util = require('../utils/Utils');
const {Store} = require('./User-models');

const util = new Util();

/**
 * The UserController.
 *
 * @method store  store
 */

class UserController {

 
  async store(req, res) {
    try {
      const {
        name,
        email,
        password,
        role
      } = req.body;
      const data = await Store(
        name,
        email,
        password,
        role
      );

      if (!data) {
        util.setSuccess(200, data);
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}

module.exports = UserController;
