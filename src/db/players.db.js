const knex = require('knex')(require('./knexfile'));
const Player = require('../model/player');

// public methods

const createPlayer = async (player_name) => {
    console.log(`Add player ${player_name}`);
    insertData = await knex('players').insert({
        player_name
    });
    return insertData[0];
}
const addPlayerToTable = async (table_id, player_id) => {
    console.log(`Add player ${player_id} to table ${table_id}`);
    return await knex('players_for_tables').insert({
        table_id, player_id
    });
}

const addGameToPlayer = async (playerName, myScore, opponentScore, tableId) => {
    const playerDetails = await knex.from('players')
    .select()
    .where('player_name', '=', playerName);
    const playerId = playerDetails[0]['player_id'];
    const playerForTableDetails = await knex.from('players_for_tables')
    .select()
    .where({
        table_id:  tableId,
        player_id: player.getPlayerId()
    });
    var player = new Player(playerId,
        playerForTableDetails[0]['player_name'],
        playerForTableDetails[0]['wins'],
        playerForTableDetails[0]['technical_wins'],
        playerForTableDetails[0]['losts'],
        playerForTableDetails[0]['duces'],
        playerForTableDetails[0]['goals_for'],
        playerForTableDetails[0]['goals_against'],
        playerForTableDetails[0]['rank']);
    await _updatePlayerWithGameResult(player, myScore, opponentScore, tableId);
}

// private methods

const _updatePlayerWithGameResult = async (player, myScore, opponentScore, tableId) => {
    gameResult = player.incrementResultValue(myScore, opponentScore);
    return await knex('players_for_tables')
    .where({
        table_id:  tableId,
        player_id: player.getPlayerId()
    })
    .increment('goals_for', myScore)
    .increment('goals_against', opponentScore)
    .increment(gameResult, 1)
    .update({
        rank: player.getNewRank(),
        'updated_at': new Date()
    });
}

module.exports = {
    createPlayer,
    addPlayerToTable,
    addGameToPlayer
};
