
exports.up = function(knex, Promise) {
  return knex.schema.createTable('enderecos', table => {
      table.increments('id').primary()
      table.string('rua').notNull()
      table.string('bairro').notNull()
      table.string('complemento').notNull()
      table.string('cep').notNull()
      table.string('cidade').notNull()
      table.string('estado').notNull()
      table.string('pais').notNull()
      table.integer('pessoaId').references('id')
          .inTable('pessoas')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('enderecos')
};
