
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dependentes', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('sexo').notNull()
      table.string('idade').notNull()
      table.integer('parentId').references('id')
          .inTable('dependentes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dependentes')
};
