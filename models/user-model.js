var { Mysql_Conn } = require('../database/connection');
var bcrypt = require("bcrypt");



const User = async (
  email,
  password,
  name
) => {
  const exists = await Mysql_Conn.select('*')
    .from('users')
    .where('email', format(email));

  if (exists.length) throw new Error('existing record');

   await Mysql_Conn('users').insert({
    email,
    password,
    name,
    role: 0})
};


module.exports = {
  User
}