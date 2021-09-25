// SQL SERVER PARTDUMP
const sql_config = {
  client: 'mssql',
  connection: {
    user: process.env.DB_USER_SQL,
    password: process.env.DB_PASS_SQL,
    server: process.env.DB_HOST_SQL,
    database: process.env.DB_DATABASE_SQL,
    connectTimeout: 90000,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    debug: true,
  },
};

const Sqn_Conn = require('knex')(sql_config);

module.exports = {
  Sqn_Conn
};
