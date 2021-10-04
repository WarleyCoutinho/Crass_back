
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('sexo').notNull()
      table.string('email').notNull()
      table.string('cpf').notNull()
      table.string('dtNascimento').notNull()
      table.string('naturalidade').notNull() 
      table.string('rua').notNull()
      table.string('bairro').notNull()
      table.string('complemento').notNull()
      table.string('cep').notNull()
      table.string('cidade').notNull()
      table.string('estado').notNull()
      table.string('pais').notNull()
      table.binary('content').notNull()
      table.integer('userId').references('id')
          .inTable('users').notNull()
      table.integer('categoryId').references('id')
          .inTable('categories').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
};
