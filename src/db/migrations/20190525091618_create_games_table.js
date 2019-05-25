
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', function (t) {
        t.increments('game_id').primary();
        t.string('first_player_name').notNullable();
        t.string('second_player_name').notNullable();
        t.integer('first_player_score').notNullable();
        t.integer('second_player_score').notNullable();
        t.timestamps(false, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};
