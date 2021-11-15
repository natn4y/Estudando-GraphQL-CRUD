const db = require('../../config/db')

module.exports = {

    // A partir do usuário, busca os perfis dele
    async perfis(usuario) {

        /*
            Junta a tabela perfis com a tabela usuarios_perfis,
            na tabela usuarios_perfis, busca o id do usuário,
            que vai ser usado para filtrar consultas:
        */

        return db('perfis')
            .join(
                'usuarios_perfis',
                'perfis.id',
                'usuarios_perfis.perfil_id'
            )
            .where({ usuario_id: usuario.id }); // Para conseguir pegar os perfis,
                                                // é preciso passar o usuário como filtro
        /*

        Exemplo de Query de consulta para ser usada no browser:

            {
                usuarios {
                    id
                    nome
                    email
                    perfis {
                        id nome rotulo
                    }
                }
                usuario(
                    filtro: {
                    #id: 2
                    email: "jlann@empresa.com.br"
                    }
                ) {
                    id
                    nome
                    email
                }
            }

        */
    }
}