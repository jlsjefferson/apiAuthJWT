const { Mysql_Conn } = require('../database/connection');


const Store = async (
  username,
  email,
  password,
  role
) => {
  const exists = await Mysql_Conn.select('*')
    .from('user')
    .where('email', email);

  if (exists.length) {
    throw new Error('existing record');
  }

  await Mysql_Conn('user').insert({
    username,
    email,
    password,
    role
  });
};

module.exports = {
  Store,
};
