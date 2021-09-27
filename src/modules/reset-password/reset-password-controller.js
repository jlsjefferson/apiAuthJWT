const {
  getPassword,
  createPassword,
  updatePassword,
} = require('./reset-password-model');

/**
 * The ResetPassword Controller.
 *
 * @method show get user registered database
 * @method create create link reset password
 * @method update update password user
 */

class ResetPassword {
  async show(req, res) {
    try {
      const { resetPasswordToken } = req.query;

      const result = await getPassword(resetPasswordToken);

      if (result) {
        res.status(200).send({ message: 'password reset link a-ok' });
      } else {
        res.status(400).json({ message: 'no data!' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const { email } = req.body;

      const result = await createPassword(email);

      if (result) {
        res.status(200).send({ message: 'recovery email sent' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { resetPasswordToken, password } = req.body;

      const result = await updatePassword(resetPasswordToken, password);

      if (result != null) {
        res.status(200).send({ message: 'password updated' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = ResetPassword;