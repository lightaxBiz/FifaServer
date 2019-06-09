const knex = require('knex')(require('./knexfile'));
const Table = require('../model/table');
const playersDB = require('./players.db');
const gamesDB = require('./games.db');

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

const getAllTables = async () => {
    console.log('fetching all the tables');
    var tables = [];
    const selectResult = await knex('tables').select();
    for (var i = 0; i < selectResult.length; i++) {
        const tableData = selectResult[i];
        const players = await playersDB.getAllPlayersForTable(tableData['table_id']);
        const games = await gamesDB.getAllGamesForTable(tableData['table_id']);
        var table = new Table(tableData['table_id'], tableData['table_name'], players, games);
        tables.push(table);
    }
    return tables;
}

module.exports = {
    createTable,
    existsTable,
    getAllTables
};