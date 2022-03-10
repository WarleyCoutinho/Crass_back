exports.up = function (knex, Promise) {
  return knex.schema.createTable('beneficios', (table) => {
    table.increments('beneficioId').primary();
    table.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('beneficios');
};
