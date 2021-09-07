'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoasSchema extends Schema {
  up () {
    this.create('pessoas', (table) => {
      table.increments()
      table.string('name',80).notNullable()
      table.string('cpf',15).notNullable()
      table.string('sexo',10).notNullable()
      table.decimal('datanascimento',10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pessoas')
  }
}

module.exports = PessoasSchema
