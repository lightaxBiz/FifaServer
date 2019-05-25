
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games_for_players', function (t) {
        t.integer('player_id').notNullable().primary();
        t.integer('game_id').notNullable().primary();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games_for_players');
};
