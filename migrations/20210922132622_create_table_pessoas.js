
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pessoas', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('email').notNull()
      table.string('dtNascimento').notNull()
      table.string('naturalidade').notNull()
      table.string('sexo').notNull()
      table.string('cpf').notNull()
      table.integer('beneficiarioId').references('id')
          .inTable('beneficiarios').notNull()
      table.integer('beneficioId').references('id')
          .inTable('beneficios').notNull()
       // table.integer('enderecoId').references('id')
         //.inTable('enderecos').notNull()
         // table.integer('rendaId').references('id')
         // .inTable('rendas').notNull()
          //table.integer('documentoId').references('id')
         // .inTable('documentos').notNull()
         //table.integer('unidadeId').references('id')
         // .inTable('unidades').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pessoas')
};
