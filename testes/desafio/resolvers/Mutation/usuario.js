const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil.js'); // Renomeia perfil para: obterPerfil
const { usuario: obterUsuario } = require('../Query/usuario.js'); // Renomeia usuario para: obterUsuario

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []
            // Se dentro de dados tiver um atributo chamado perfis, então...
            if(dados.perfis) {
                // Para cada perfil (filtro) dentro de dados,
                for(let filtro of dados.perfis) {
                    // var perfil recebe o return de ObterPerfil
                    const perfil = await obterPerfil(_, { filtro });
                    // Caso receba um return diferente de null, faça...
                    if(perfil) idsPerfis.push(perfil.id)
                }
            }
            // Deleta o atributo perfis dentro de dados antes de inserir o novo usuário,
            // pois não é necessário no banco de dados, já que esse atributo é gerado pelo join
            delete dados.perfis;
            // Insere o usuário no banco de dados e armazena o seu id na var id
            const [ id ] = await db('usuarios')
                .insert(dados)
            // Insere no banco de dados o id do perfil e o id do usuário passando a var id
            for(let perfil_id of idsPerfis) {
                await db('usuarios_perfis')
                    .insert({ perfil_id, usuario_id: id })
            }
            // Retorna o usuário que foi inserido
            return db('usuarios')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            // Obtém o objeto do usuário a ser excluído
            const usuario = await obterUsuario(_, { filtro });
            // Se existir o objeto do usuário, faça...
            if(usuario) {
                const { id } = usuario; // Pega o id do objeto usuário e guarda na var id
                await db('usuarios_perfis')
                    .where({ usuario_id: id }).delete(); // Deleta o perfil associado ao usuário
                await db('usuarios')
                    .where({ id }).delete(); // Deleta o usuário associado a variável id
            }
            return usuario;
        } catch(e) {
            throw new Error(e.sqlMessage);
        }

    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
    }
}