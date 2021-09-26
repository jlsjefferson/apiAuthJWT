var Mysql_Conn = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "baseauth",
  },
});

module.exports = {
  Mysql_Conn,
};
