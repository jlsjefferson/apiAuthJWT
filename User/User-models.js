const Util = require("../utils/Utils");
const { Mysql_Conn } = require("../database/connection");
const bcrypt = require("bcrypt");

const util = new Util();

class UserModel {
  async getAll() {
    try {
      return await Mysql_Conn.select("id", "email", "username", "role").table(
        "user"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getByID(id) {
    try {
      const result = await Mysql_Conn.select("id", "email", "username", "role")
        .table("user")
        .where("id", id);
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async Store(username, email, password, role) {
    const hash = await bcrypt.hash(password, 10);

    if (exists.length) {
      throw new Error("email já cadastrado");
    }

    await Mysql_Conn("user").insert({
      username,
      email,
      password: hash,
      role,
    });
  }

  async findEmail(email) {
    try {
      var result = await Mysql_Conn.select("*").table("user").where({
        email: email,
      });
      return !!result.length > 0;
    } catch (error) {}
  }

  async updateUser(id, email, username, role) {
    var user = await this.getByID(id);

    if (user != undefined) {
      var editUser = {};

      if (email != undefined) {
        if (email != user.email) {
          var result = await this.findEmail(email);
          if (!result) {
            editUser.email = email;
          } else {
            return {
              status: false,
              err: "email já cadastrado",
            };
          }
        }
      }

      if (username != undefined) {
        editUser.username = username;
      }
      if (role != undefined) {
        editUser.role = role;
      }
      try {
        await Mysql_Conn.update(editUser).where("id", id).table("user");
        return {
          status: true,
        };
      } catch (error) {
        return {
          status: false,
          err: error,
        };
      }
    } else {
      return {
        status: false,
        err: "user not found",
      };
    }
  }
}

module.exports = new UserModel();
