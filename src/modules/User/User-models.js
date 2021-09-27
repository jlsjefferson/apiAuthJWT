const Util = require("../../utils/Utils");
const { Mysql_Conn, sql_Conn } = require("../../infra/database/connection");
const bcrypt = require("bcrypt");
const UserRepository = require("../../infra/repository/user-repository");

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
      return UserRepository.getAll();
    } catch (error) {
      console.log(error);
    }
  }

  async getByID(id) {
    try {
      const result = await UserRepository.getByID(id);
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
    await UserRepository.storeUser(username, email, hash, role);
  }

  async updateUser(id, email, username, role) {
    const exists = await UserRepository.findEmail(email);
    const user = await UserRepository.getByID(id);
    if (exists.length > 0) {
      throw new Error("email already registered");
    }
    if (user.length == 0) {
      throw new Error("user does not exist");
    }
    await UserRepository.updateUser(id, email, username, role);
  }

  async delete(id) {
    const user = await this.getByID(id);
    if (user.length == 1) {
      try {
        await UserRepository.deleteUser(id);
        return { status: true };
      } catch (err) {
        return { status: false, err: err };
      }
    } else {
      return {
        status: false,
        err: "user not found.",
      };
    }
  }
}

module.exports = new UserModel();
