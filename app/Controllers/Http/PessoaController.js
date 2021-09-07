'use strict'
const Pessoa = use('App/Models/Pessoa');

class PessoaController {

  async store({ request }){

    const dataToCreate = request.only(['name','cpf','sexo',
    'datanascimento']);

       return await Pessoa.create(dataToCreate);
   }


  async listar(){
     return await Pessoa.all();
  }

  async buscar({params}){
    return await Pessoa.find(params.id);
  }

  async alterar({params,request}){
    const pessoa = await Pessoa.finOrFail(params.id);
    const dataToUpddate = request.only(['name','cpf','sexo','datanascimento']);

    pessoa.merge(dataToUpddate);
    await pessoa.save();
    return pessoa;
  }

  async apagar({ params }){

    const pessoa = await Pessoa.finOrFail(params.id);

    await pessoa.delete();

    return{
      message: 'Pessoa excluida com sucesso!!'
    }

  }



}

module.exports = PessoaController
