"use strict"

const User = use("App/Models/User")

class UserController {
  async create ({ request }) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }

  async list(){
    return await User.all();
 }

 async show({params}){
   return await User.find(params.id);
 }



}

module.exports = UserController
