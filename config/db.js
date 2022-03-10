const config = require('../knexfile');
const knex = require('knex')(config);

knex.migrate.latest([config]); //não muito aconselaveis fazer essa chamada aqui
module.exports = knex;
