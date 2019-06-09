const knex = require('knex')(require('./knexfile'));
const Player = require('../model/player');

// public methods

const addPlayerToTable = async (table_id, player_name) => {
    console.log(`Add player ${player_name} to table ${table_id}`);
    const insertResult = await knex('players_for_tables').insert({
        table_id, player_name
    });
    return insertResult[0];
}

const addGameToPlayer = async (playerName, myScore, opponentScore, tableId) => {
    const playerForTableDetails = await knex.from('players_for_tables')
    .select()
    .where({
        table_id:  tableId,
        player_name: playerName
    });
    var player = new Player(playerName,
        playerForTableDetails[0]['wins'],
        playerForTableDetails[0]['technical_wins'],
        playerForTableDetails[0]['losts'],
        playerForTableDetails[0]['duces'],
        playerForTableDetails[0]['goals_for'],
        playerForTableDetails[0]['goals_against'],
        playerForTableDetails[0]['rank']);
    await _updatePlayerWithGameResult(player, myScore, opponentScore, tableId);
}

const getAllPlayersForTable = async (tableId) => {
    console.log(`getting all players for table ${tableId}`);
    const selectResult = await knex('players_for_tables').select().where('table_id', '=', tableId);
    var players = [];
    for (var i = 0; i < selectResult.length; i++) {
        const playerDetails = selectResult[i];
        const player = new Player(playerDetails['player_name'],
            playerDetails['wins'],
            playerDetails['technical_wins'],
            playerDetails['losts'],
            playerDetails['duces'],
            playerDetails['goals_for'],
            playerDetails['goals_against'],
            playerDetails['rank']);
        players.push(player);
    }
    return players;
}

// private methods

const _updatePlayerWithGameResult = async (player, myScore, opponentScore, tableId) => {
    gameResult = player.incrementResultValue(myScore, opponentScore);
    return await knex('players_for_tables')
    .where({
        table_id:  tableId,
        player_name: player.getPlayerName()
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
    addPlayerToTable,
    addGameToPlayer,
    getAllPlayersForTable
};
