exports.up = function (knex, Promise) {
  return knex.schema.createTable('pessoas', (table) => {
    table.increments('pessoaId').primary();
    table.string('name', 50).notNullable();
    table.string('sexo').notNullable();
    table.string('cpf').notNullable().unique();
    table.string('email').notNullable();
    table.date('dtNascimento').notNullable();
    table.string('naturalidade').notNullable();
    table.string('telefone').notNullable();
    table.string('celular').notNullable();
    table.string('whastsapp').notNullable();
    table.string('rua').notNullable();
    table.string('bairro').notNullable();
    table.string('complemento').notNullable();
    table.string('cep').notNullable();
    table.string('cidade', 15).notNullable();
    table.string('estado', 10).notNullable();
    table.string('pais', 10).notNullable();
    // table.string('imageUrl', 1000).notNullable();
    table.string('content', 1000).notNullable();
    // table
    //   .string('beneficioId')
    //   .references('id')
    //   .inTable('beneficios')
    //   .notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pessoas');
};
