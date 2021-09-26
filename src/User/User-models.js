const Util = require("../utils/Utils");
const { Mysql_Conn } = require("../database/connection");
const bcrypt = require("bcrypt");

const util = new Util();

class UserModel {
  async findEmail(email) {
    try {
      return Mysql_Conn.select("email").table("user").where({
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      return Mysql_Conn.select("id", "email", "username", "role").table("user");
    } catch (error) {
      console.log(error);
    }
  }

  async getByID(id) {
    try {
      const result = await Mysql_Conn.select("id", "email", "username", "role")
        .table("user")
        .where("id", id);
      if (!result) {
        return undefined;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async Store(username, email, password, role) {
    const hash = await bcrypt.hash(password, 10);
    const exists = await this.findEmail(email);
    if (exists.length > 0) {
      throw new Error("email já cadastrado");
    }
    await Mysql_Conn("user").insert({
      username,
      email,
      password: hash,
      role,
    });
  }

  async updateUser(id, email, username, role) {
    const exists = await this.findEmail(email);
    const user = await this.getByID(id);
    console.log(user);
    if (exists.length > 0) {
      throw new Error("email já cadastrado");
    }
    if (user.length == 0) {
      throw new Error("usuario nao existe");
    }
    await Mysql_Conn("user").where({ id }).update({
      email,
      username,
      role,
    });
  }
}

module.exports = new UserModel();
