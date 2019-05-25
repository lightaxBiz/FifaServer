const knex = require('knex')(require('./knexfile'));

module.exports = {
    createTable ({ table_name }) {
        console.log(`Add table ${table_name}`);
        return knex('tables').insert({
            table_name
        })
    }
};