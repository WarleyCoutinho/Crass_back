
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beneficios', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.integer('parentId').references('id')
          .inTable('beneficios')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beneficios')
};
