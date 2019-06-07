const knex = require('knex')(require('./knexfile'));

const createTable = async (table_name) => {
    console.log(`Add table ${table_name}`);
    return knex('tables').insert({
        table_name
    });
}

const addGame = async (table_id, game_id) => {
    console.log(`Add game ${game_id} to table ${table_id}`);
    return knex('games_for_tables').insert({
        table_id, game_id
    });
}

module.exports = {
    createTable,
    addGame
};