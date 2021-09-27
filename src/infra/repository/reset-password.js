const {Mysql_Conn} = require("../database/connection")

module.exports = new class ResetTokenUser {

  findtoken(tokenpass){
    Mysql_Conn('user').where({ tokenpass }).first();
  }

  createPassword(email){
    Mysql_Conn('user').where('email', email).first();
  }
   
}

