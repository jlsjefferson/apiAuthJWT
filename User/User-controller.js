const Util = require('../utils/Utils');
const UserModel = require('./User-models');

const util = new Util();

/**
 * The UserController.
 *
 * @method store  store
 */

class UserController {

  async index(req, res){  
      const users = await UserModel.getAll()
      return res.json(users)  
  }

  async findUser(req,res){
    try {
        const id = req.params.id;
      const user =  await UserModel.getByID(id)
      if(user == undefined){
        res.status(404)
        res.json({message: "user not found"})
      }else{
        res.json(user)
      }
    } catch (error) {
      
    }
  }
 
  async store(req, res) {
    try {
      const {
        name,
        email,
        password,
        role
      } = req.body;
      const data = await UserModel.Store(
        name,
        email,
        password,
        role
      );

      if (!data) {
        util.setSuccess(200, data);
      }

      return util.send(res);
    } catch (err) {
        util.setError(400,err.message);
      return util.send(res);
    }
  }

  async edit(req, res){
    var {id, username, role, email} = req.body;
    var result = await UserModel.updateUser(id, username, role, email);
    console.log(result)
    if(result != undefined){
        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }else{
            res.status(406);
            res.send(result.err)
        }
    }else{
        res.status(406);
        res.send("Ocorreu um erro no servidor!");
    }
}
}

module.exports = UserController;
