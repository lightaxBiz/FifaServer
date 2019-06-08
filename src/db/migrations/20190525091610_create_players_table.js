
exports.up = function(knex, Promise) {
    return knex.schema.createTable('players', function (t) {
        t.increments('player_id').primary();
        t.string('player_name').notNullable().unique();
        t.timestamps(false, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('players');
};
