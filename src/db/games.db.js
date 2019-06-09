const knex = require('knex')(require('./knexfile'));
const Game = require('../model/game');

// public methods

const addGame = async (first_player_name, second_player_name, first_player_score, second_player_score, table_id) => {
    console.log(`Add game ${first_player_name} ${first_player_score} : ${second_player_score} ${second_player_name}`);
    const insertData = await knex('games').insert({
        first_player_name, second_player_name, first_player_score, second_player_score, table_id
    });
    return insertData[0];
}

const getAllGamesForTable = async (tableId) => {
    console.log(`get all games for table ${tableId}`);
    var games = [];
    const selectResult = await knex('games').select().where('table_id', '=', tableId);
    for (var i = 0; i < selectResult.length; i ++) {
        const gameDetails = selectResult[i];
        const game = new Game(gameDetails['game_id'], 
            gameDetails['first_player_name'], 
            gameDetails['second_player_name'], 
            gameDetails['first_player_score'], gameDetails['second_player_score']);
        games.push(game);
    }
    return games;
}

module.exports = {
    addGame,
    getAllGamesForTable
};