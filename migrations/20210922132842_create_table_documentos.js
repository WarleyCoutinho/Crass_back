
exports.up = function(knex, Promise) {
  return knex.schema.createTable('documentos', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('description', 1000).notNull()
      table.string('imageUrl', 1000)
      table.binary('content').notNull()
      table.integer('parentId').references('id')
          .inTable('documentos')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('documentos')
};
