exports.up = function (knex, Promise) {
  return knex.schema.createTable('usuario', (table) => {
    table.increments('usuarioId').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('nivel').defaultTo(4);
    table.boolean('admin').notNullable().defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('usuario');
};
