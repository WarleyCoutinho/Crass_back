'use strict'

const Pessoa = use("App/Models/Pessoa");

class PessoaController {

  async store({ request }){

    const dataToCreate = request.only(["name","cpf","sexo","datanascimento"])

       const Pessoa = await Pessoa.create(dataToCreate)
       return Pessoa

   }


  async list(){
     return await Pessoa.all();
  }

  async show({params}){
    return await Pessoa.find(params.id);
  }

  async Update({params,request}){
    const pessoa = await Pessoa.finOrFail(params.id);
    const dataToUpdate = request.only(["name","cpf","sexo","datanascimento"]);
    pessoa.merge(dataToUpdate);
    await pessoa.save();
    return pessoa;
  }

  async remove({ params }){

    const pessoa = await Pessoa.finOrFail(params.id);

    await pessoa.delete();

    return{
      message: 'Pessoa excluida com sucesso!!'
    }

  }



}

module.exports = PessoaController
