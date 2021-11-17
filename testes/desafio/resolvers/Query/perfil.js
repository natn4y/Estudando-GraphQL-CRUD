const db = require('../../config/db')

module.exports = {
    perfis(parent, args, context) {
        context && context.validarAdmin();
        // O método db serve para acessar o banco de dados
        // O parametro perfis é o nome da tabela no banco de dados
        return db('perfis');

        /*

        Exemplo de Query de consulta para ser usada no browser:

        {
            perfis {
                id nome rotulo
            }
        }

        */

    },

    // O parametro filtro é um objeto que contém os campos que serão usados para filtrar os dados
    perfil(_, { filtro }, context) {
        context && context.validarAdmin();
        // Se não tiver filtro, retorna null
        if (!filtro) {
            return null;
        }
        // Pega o id e o nome que vem do objeto filtro
        const { id, nome } = filtro;
        // Se o id tiver setado, retorna o perfil pelo id
        // O método first() serve para pegar apenas o primeiro resultado, que é um objeto
        if (id) {
            return db('perfis').where({ id }).first();
        } else if (nome) {
            // Senão, se o nome tiver setado, retorna o perfil pelo nome
            // O método first() serve para pegar apenas o primeiro resultado, que é um objeto
            return db('perfis').where({ nome }).first();
        } else {
            return null;
        }

        /*

        Exemplo de Query de consulta para ser usada no browser:

        {
            perfil (
                filtro: {
                #id: 1
                nome: "admin"
            }
            ) {
                id nome rotulo
            }
        }

        */
    }
}