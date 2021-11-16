const db = require('../../config/db')

module.exports = {

    usuarios(perfil) {

        return db('usuarios')
            .join(
                'usuarios_perfis',
                'usuarios.id',
                'usuarios_perfis.usuario_id'
            )
            .where({ perfil_id: perfil.id });
        /*

        Exemplos de Query de consulta para ser usada no browser:

        {
            {
                perfis {
                    nome
                    usuarios {
                        nome
                    }
                }
            }
        }

        ou:

        {
        perfil(
            filtro: {
            nome: "master"
            }
        ) {
            nome
            usuarios {
            nome
            }
        }
        }

        */
    }
}