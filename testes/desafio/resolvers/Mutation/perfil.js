const db = require('../../config/db')

module.exports = {
    // dados é um objeto que contém os dados do usuário
    async novoPerfil(_, { dados }) {
        try {
            // Recebe o id de dentro do array que é retornado pelo método insert
            const [ id ] = await db('perfis')
            .insert(dados)
            // Retorna os dados a partir do id, obs.: se usar desestruturação, talvez seja necessário usar {  }
            return db('perfis')
                .where( { id } ).first();
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPerfil(_, { filtro }) {
        // implementar
    },
    async alterarPerfil(_, { filtro, dados }) {
        // implementar
    }
}