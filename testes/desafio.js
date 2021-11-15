const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    // busca o usuario
    let usuario = await db('usuarios')
        .where({ email }).first();

    if (!usuario) {
        // quando você chama insert, o retorno é um array com o id do registro inserido
        let [id] = await db('usuarios')
            .insert({ nome, email, senha });
        // busca o usuario recém criado
        usuario = await db('usuarios')
            .where({ id }).first();
    } else {
        // se o usuario existe, atualiza o nome , email, senha
        await db('usuarios')
            .where({ id: usuario.id })
            .update({ nome, email, senha });
        // atualiza o objeto usuario com os dados atualizados
        usuario = { ...usuario, nome, email, senha };
    }

    return usuario;
}
async function salvarPerfil(nivel, rotulo) {
    // busca o perfil a partir do nivel
    let perfil = await db('perfis')
        .where({ nivel }).first();
        // se não existir, cria um novo
    if (!perfil) {
        let [id] = await db('perfis')
            .insert({ nivel, rotulo });
        // busca o perfil recém criado
        perfil = await db('perfis')
            .where({ id }).first();
    } else {
        // se já existir, atualiza o nivel e o rotulo
        await db('perfis')
            .where({ id: perfil.id })
            .update({ nivel, rotulo });
        // sobrescreve o objeto perfil com os dados de nivel e rotulo atualizados
        perfil = { ...perfil, nivel, rotulo };
    }

    return perfil;
}

async function adicionarPerfis(usuario, ...perfis) {
    const usuario_id = usuario.id;
    // apaga todos os perfis do usuario
    await db('usuarios_perfis')
    .where({ usuario_id })
    .delete();
    // adiciona os perfis ao usuario
    for (perfil of perfis) {
        // const perfil_id recebe o id do perfil
        const perfil_id = perfil.id;
        // adiciona o perfil ao usuario
        await db('usuarios_perfis')
        .insert({ usuario_id, perfil_id });
    }
}

async function executar() {
    // const usuario recebe o retorno da função salvarUsuario, que é um objeto com os dados do usuario
    const usuario = await salvarUsuario('Wick',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('RH_1', 'Pessoal')
    const perfilB = await salvarPerfil('financeiro_1', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())