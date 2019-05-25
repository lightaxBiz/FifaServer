
exports.up = function(knex, Promise) {
    return knex.schema.createTable('players', function (t) {
        t.increments('player_id').primary();
        t.string('player_name').notNullable().unique();
        t.integer("wins").notNullable();
        t.integer("technical_wins").notNullable();
        t.integer("losts").notNullable();
        t.integer("duces").notNullable();
        t.integer("goals_for").notNullable();
        t.integer("goals_against").notNullable();
        t.float("rank").notNullable();
        t.timestamps(false, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('players');
};
