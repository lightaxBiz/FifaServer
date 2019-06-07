const knex = require('knex')(require('./knexfile'));

const createTable = async (table_name) => {
    console.log(`Add table ${table_name}`);
    return knex('tables').insert({
        table_name
    });
}

module.exports = {
    createTable
};