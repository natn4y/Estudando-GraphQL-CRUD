const db = require('../config/db.js');

/*
db('perfis').select('nivel', 'id')
    .from('perfis')
    .limit(3) // para limitar a quantidade de registros
    .then(res => console.log(res))
    .finally(() => db.destroy());
*/

/*
db('perfis').select('nivel', 'id')
    .from('perfis')
    .limit(3).offset(2) // para pular 2 registros
    .then(res => console.log(res))
    .finally(() => db.destroy());
*/

/*
db('perfis').select('nivel', 'id')
    .from('perfis')
    .then(res => console.log(res))
    .finally(() => db.destroy());
*/

/*
db('perfis')
    .where({ id: 2 }) // para buscar um registro específico
    .first() // Se você quiser pegar o primeiro elemento do resultado
    .then(res => console.log(res))
    .finally(() => db.destroy()); // Destrói a conexão com o banco de dados
*/

db('perfis')
    //.where('nivel', 'like', '%min' ) // para buscar um registro filtrando um trecho do nome
    //.whereNot({ id: 2}) // para filtrar todos os registros ignorando um registro específico
    .whereIn('id', [1, 2, 3]) // para filtrar todos os registros que contenham um dos valores
    .then(res => console.log(res))
    .finally(() => db.destroy()); // Destrói a conexão com o banco de dados