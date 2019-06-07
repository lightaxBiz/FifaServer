const knex = require('knex')(require('./knexfile'));
const GameResultEnum = require('./../model/game-result.enum');
const WINNING_POINT = 3;
const TECHNICAL_WINNING_POINTS = 4;
const LOSE_POINTS = 0;
const DUCE_POINTS = 1;
const HIGHEST_POSSIBLE_RANK = 100;
const TECHNICAL_WIN_DIFFERENT = 3

const createPlayer = async (player_name) => {
    console.log(`Add player ${player_name}`);
    return knex('players').insert({
        player_name
    });
}

const addGameToPlayer = async (player_name, my_score, opponent_score, game_id) => {
    const playerDetails = await knex.from('players').select().whereRaw('player_name = ?', [ player_name ]);
    await _updatePlayerWithGameResult(playerDetails[0], my_score, opponent_score);
}

const _updatePlayerWithGameResult = async (playerDetails, my_score, opponent_score) => {
    let gameResult;
    gameResult = my_score > opponent_score
        ? GameResultEnum.WIN
        : my_score < opponent_score
            ? GameResultEnum.LOST : GameResultEnum.DUCE;
    if (gameResult === GameResultEnum.WIN && (my_score - opponent_score >= TECHNICAL_WIN_DIFFERENT)) {
        gameResult = GameResultEnum.TECHNICAL_WIN;
    }
    
    let resultFieldToIncrement;
    switch (gameResult) {
        case GameResultEnum.WIN:
            resultFieldToIncrement = 'wins';
            break;
        case GameResultEnum.TECHNICAL_WIN:
            resultFieldToIncrement = 'technical_wins';
            break;
        case GameResultEnum.LOST:
            resultFieldToIncrement = 'losts';
            break;
        case  GameResultEnum.DUCE:
            resultFieldToIncrement = 'duces';
            break;
    }
    playerDetails[resultFieldToIncrement]++;
    await _updateGameCount(playerDetails['player_id'], resultFieldToIncrement);
    await _updateRank(playerDetails);
}

const _updateRank = async(playerDetails) => {
    const totalGameNumber = playerDetails['wins'] + playerDetails['technical_wins'] + playerDetails['losts'] + playerDetails['duces'];
    const highestValue = totalGameNumber * WINNING_POINT;
    const currentValue = playerDetails['wins'] * WINNING_POINT
        + playerDetails['technical_wins'] * TECHNICAL_WINNING_POINTS
        + playerDetails['losts'] * LOSE_POINTS
        + playerDetails['duces'] * DUCE_POINTS;
    return await knex('players')
    .whereRaw('player_id = ?', [ playerDetails['player_id'] ])
    .update({
        'updated_at': new Date(),
        rank: ((currentValue / highestValue) * HIGHEST_POSSIBLE_RANK)
    });
}

const _updateGameCount = async(player_id, resultFieldToIncrement) => {
    return await knex('players')
    .where('player_id', '=', player_id)
    .increment(resultFieldToIncrement, 1)
    .update({
        'updated_at': new Date()
    });
}

module.exports = {
    createPlayer,
    addGameToPlayer
};