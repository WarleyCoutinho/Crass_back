
exports.up = function(knex, Promise) {
  return knex.schema.createTable('unidades', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('cnpj').notNull()
      table.integer('parentId').references('id')
          .inTable('unidades')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('unidades')
};
