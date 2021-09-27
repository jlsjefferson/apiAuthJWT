const bcrypt = require('bcrypt');
const { Mysql_Conn } = require('../../infra/database/connection');
const { sendResetPassword } = require('../../email');

const getPassword = async (resetPasswordToken) => {
  return Mysql_Conn('user')
    .where({ tokenpass }).first();
};


const createPassword = async (email) => {
  const result = await Mysql_Conn('user')
    .where('email', email).first();

  if (!result) {
    throw new Error('email not in db');
    
  } else if (result.role === 'disable') {
    throw new Error('user bloq in database');

  } else {
    sendResetPassword(result);
  }

  return result;
};

const updatePassword = async (tokenpass, password) => {
  const result = bcrypt.hash(password, 12).then((hashedPassword) => {
    return Mysql_Conn('user')
      .update({
        password: hashedPassword,
        tokenpass: null,
      })
      .where({
        tokenpass,
      });
  });

  return result;
};


module.exports = {
  getPassword,
  createPassword,
  updatePassword
};