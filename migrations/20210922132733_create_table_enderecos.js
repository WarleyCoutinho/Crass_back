
exports.up = function(knex, Promise) {
  return knex.schema.createTable('enderecos', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('rua').notNull()
      table.string('bairro').notNull()
      table.string('complemento').notNull()
      table.string('cp').notNull()
      table.string('cidade').notNull()
      table.string('estado').notNull()
      table.integer('parentId').references('id')
          .inTable('enderecos')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('enderecos')
};
