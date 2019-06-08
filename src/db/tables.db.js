const knex = require('knex')(require('./knexfile'));

// public methods

const createTable = async (table_name) => {
    console.log(`Add table ${table_name}`);
    const insertResult = await knex('tables').insert({
        table_name
    });
    return insertResult[0];
}

const existsTable = async (tableId) => {
    console.log(`checking if table ${tableId} exists`);
    const selectResult = await knex('tables').select('table_id').where('table_id', '=', tableId);
    return selectResult.length != 0;
}

module.exports = {
    createTable,
    existsTable
};