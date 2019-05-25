
exports.up = function(knex, Promise) {
    return knex.schema.createTable('players_for_tables', function (t) {
        t.integer('table_id').notNullable();
        t.integer('player_id').notNullable().primary();
        t.timestamps(false, true);
        t.primary([ 'table_id', 'player_id']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('players_for_tables');
};
