
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games_for_players', function (t) {
        t.integer('player_id').notNullable();
        t.integer('game_id').notNullable();
        t.timestamps(false, true);
        t.primary([ 'player_if', 'game_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games_for_players');
};
