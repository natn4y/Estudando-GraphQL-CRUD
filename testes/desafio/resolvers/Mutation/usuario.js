const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil.js'); // Renomeia perfil para: obterPerfil

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
        // Implementar
    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
    }
}