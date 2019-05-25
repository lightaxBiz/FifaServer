
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games_for_tables', function (t) {
        t.integer('table_id').notNullable().primary();
        t.integer('game_id').notNullable().primary();
        t.timestamps(false, true);
        t.primary([ 'table_id', 'game_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games_for_tables');
};
