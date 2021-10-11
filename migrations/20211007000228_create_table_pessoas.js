
exports.up = function (knex, Promise) {
  return knex.schema.createTable('pessoas', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('sexo').notNull()
      table.string('cpf').notNull().unique()
      table.string('email').notNull()
      table.string('dtNascimento').notNull()
      table.string('naturalidade').notNull()
      table.integer('userId').references('id')
      .inTable('users').notNull() 
      
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pessoas')
};
