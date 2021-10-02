
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beneficiarios', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('sexo').notNull()
      table.string('email').notNull()
      table.string('cpf').notNull()
      table.string('dtNascimento').notNull()
      table.string('naturalidade').notNull()
      table.integer('parentId').references('id')
          .inTable('beneficiarios')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beneficiarios')
};
