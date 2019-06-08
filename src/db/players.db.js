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

const addGameToPlayer = async (player_name, my_score, opponent_score, game_id) => {
    const playerDetails = await knex.from('players').select().whereRaw('player_name = ?', [ player_name ]);
    var player = new Player(playerDetails[0]['player_id'],
    playerDetails[0]['player_name'],
    playerDetails[0]['wins'],
    playerDetails[0]['technical_wins'],
    playerDetails[0]['losts'],
    playerDetails[0]['duces'],
    playerDetails[0]['goals_for'],
    playerDetails[0]['goals_against'],
    playerDetails[0]['rank']);
    await _updatePlayerWithGameResult(player, my_score, opponent_score);
}

// private methods

const _updatePlayerWithGameResult = async (player, myScore, opponentScore) => {
    gameResult = player.incrementResultValue(myScore, opponentScore);
    return await knex('players')
    .where('player_id', '=', player.getPlayerId())
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
