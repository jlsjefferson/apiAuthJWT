const express = require('express');

const router = express.Router();
const ForgotPassword = require('./reset-controller');

const forgotPassword = new ForgotPassword();

router
  .post('/forgotPassword', forgotPassword.create)
  .get('/reset', forgotPassword.show)
  .put('/updatePasswordViaEmail', forgotPassword.update);

module.exports = router;