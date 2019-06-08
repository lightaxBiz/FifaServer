
exports.up = function(knex, Promise) {
    return knex.schema.createTable('players_for_tables', function (t) {
        t.integer('table_id').notNullable();
        t.string('player_name').notNullable();
        t.integer("wins").notNullable();
        t.integer("technical_wins").notNullable();
        t.integer("losts").notNullable();
        t.integer("duces").notNullable();
        t.integer("goals_for").notNullable();
        t.integer("goals_against").notNullable();
        t.float("rank").notNullable();
        t.timestamps(false, true);
        t.primary([ 'table_id', 'player_name']);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('players_for_tables');
};
