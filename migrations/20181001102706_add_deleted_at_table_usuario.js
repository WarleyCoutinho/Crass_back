exports.up = function (knex, Promise) {
  return knex.schema.alterTable('usuario', (table) => {
    table.timestamp('deletedAt');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('usuario', (table) => {
    table.dropColumn('deletedAt');
  });
};
