const router = require('express').Router();

const LocalizacaoController = require('../Localizacao/Localizacao-controller');


const localizacaoController = new LocalizacaoController()

router
  .post('/', localizacaoController.store)

module.exports = router;
