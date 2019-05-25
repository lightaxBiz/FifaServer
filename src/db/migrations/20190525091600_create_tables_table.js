
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tables', function (t) {
        t.increments('table_id').primary();
        t.string('table_name').notNullable();
        t.timestamps(false, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tables');
};
