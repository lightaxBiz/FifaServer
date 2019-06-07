const knex = require('knex')(require('./knexfile'));

const addGame = async (first_player_name, second_player_name, first_player_score, second_player_score) => {
    console.log(`Add game ${first_player_name} ${first_player_score} : ${second_player_score} ${second_player_name}`);
    const insertData = await knex('games').insert({
        first_player_name, second_player_name, first_player_score, second_player_score
    });
    return insertData[0];
}

module.exports = {
    addGame
};