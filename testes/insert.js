
const db = require('../config/db.js');
/*
const novoPerfil = {
    nivel: 'visitante',
    rotulo: 'Visitante'
};

db('perfis').insert(novoPerfil)
    .then(res => console.log(res))
    .catch(err => console.error(err.sqlMessage))
    .finally(() => db.destroy());
*/

// Modo mais detalhado
const perfilSU = {
    nivel: 'root' + Math.random(),
    rotulo: 'Super Usuário'
}

db.insert(perfilSU).into('perfis')
    .then(res => res[0])
    .then(id => `Id do perfil inserido: ${id}`)
    .then(string => console.log(string))
    .catch(err => console.error(err.sqlMessage))
    .finally(() => db.destroy()); // Na vida real não se faz assim