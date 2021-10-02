
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rendas', table => {
      table.increments('id').primary()
      table.string('empresa').notNull()
      table.string('funcao').notNull()
      table.string('salario').notNull()
      table.integer('parentId').references('id')
          .inTable('rendas')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rendas')
};
