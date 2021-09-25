const Util = require('../utils/Utils');
const {Store} = require('./Localizacao-models');

const util = new Util();

/**
 * The LocalizacaoController.
 *
 * @method store  store
 */

class LocalizacaoController {

   // cadLocal
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

      req.io.emit('update-localizacao');
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}

module.exports = LocalizacaoController;
