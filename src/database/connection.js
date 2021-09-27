require('dotenv').config();


const Mysql_Conn = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST_MYSQL,
    user: process.env.DB_USER_MYSQL,
    password: process.env.DB_PASSWORD_MYSQL,
    database: process.env.DB_DATABASE_MYSQL
  },
});

const Sql_Conn = require('knex')({
  client: 'mssql',
  connection: {
    user: process.env.DB_USER_SQL,
    password: process.env.DB_PASS_SQL,
    server: process.env.DB_HOST_SQL,
    database: process.env.DB_DATABASE_SQL,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
    debug: true,
  },
}) 

module.exports = {
  Mysql_Conn,
  Sql_Conn
};
