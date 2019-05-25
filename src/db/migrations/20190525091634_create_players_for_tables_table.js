
exports.up = function(knex, Promise) {
    return knex.schema.createTable('players_for_tables', function (t) {
        t.integer('table_id').notNullable().primary();
        t.integer('player_id').notNullable().primary();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('players_for_tables');
};
