exports.up = function(knex) {
    return knex.schema.createTable('perfis', table => {
        table.increments('id').primary();
        table.string('nivel').notNull().unique();
        table.string('rotulo').notNull();
    }).then(() => {
        return knex('perfis').insert([
            { nivel: 'comum', rotulo: 'comum' },
            { nivel: 'admin', rotulo: 'administrador' },
            { nivel: 'master', rotulo: 'Master' }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('perfis');
};
