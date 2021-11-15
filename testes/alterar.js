const db = require('../config/db');

const novoUsuario = {
    nome: 'Cristian',
    email: 'cristian@empresa.com',
    senha: '123456'
}

async function exercicio() {
    const {qtde} = await db('usuarios')
    .count('* as qtde').first();
     console.log(qtde);

    // inserir (se a tabela estiver vazia)
    if (qtde === 0) {
        await db('usuarios').insert(novoUsuario);
    }

    // consultar
    let { id } = await db('usuarios')
    .select('id').limit(1).first();

    // console.log(id);

    // alterar
    await db('usuarios').where({id}).update( {
        nome: 'Wick',
        email: 'Wick@empresa.com'
    } );

    return db('usuarios').where({id})
}

exercicio()
    .then(usuarios => console.log(usuarios))
    .finally(() => db.destroy());