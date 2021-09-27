const {Mysql_Conn} = require("../database/connection")

module.exports = new class UserRepository {

  findEmail(email) {
    return Mysql_Conn.select("email").table("user").where({
      email: email,
    });
  }
  getAll(){
    return Mysql_Conn.select("id", "email", "username", "role").table("user")
  }
  getByID(id){

   return Mysql_Conn.select("id", "email", "username", "role")
        .table("user")
        .where("id", id)
  }
 storeUser(username, email, hash, role){
   return Mysql_Conn("user").insert({
    username,
    email,
    password: hash,
    role,
  });
}

updateUser(id, email, username, role){
  return Mysql_Conn("user").where({ id }).update({
    email,
    username,
    role,
  });
}

deleteUser(id){
  return Mysql_Conn("user").where({id}).delete()
}


}