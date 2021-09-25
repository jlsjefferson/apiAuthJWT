const { Sqn_Conn } = require('../database/connection');


const Store = async (
  name,
  email,
  password,
  role
) => {
  const exists = await Sqn_Conn.select('*')
    .from('users')
    .where('email', email);

  if (exists.length) {
    throw new Error('existing record');
  }

  await Sqn_Conn('users').insert({
    name,
    email,
    password,
    role
  });
};

module.exports = {
  Store,
};
