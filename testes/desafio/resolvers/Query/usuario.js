const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../comum/usuario.js')

module.exports = {

    async login(_, { dados }) {
        const usuario = await db('usuarios')
            .where({ email: dados.email })
            .first()

            if (!usuario) {
                throw new Error('Usuário/senha inválido')
            }

            const saoIguais = bcrypt.compareSync(dados.senha, usuario.senha)

            if (!saoIguais) {
                throw new Error('Usuário/senha inválido')
            }

            return getUsuarioLogado(usuario)
    },

    usuarios(obj, args, context) {
        context && context.validarAdmin(); // Se context for setado e usuário for admin...
        return db('usuarios')
    },
    usuario(_, { filtro }, context) {
        context && context.validarUsuarioFiltro(filtro); // Valida o filtro para saber se é o usuário logado
        if (!filtro) return null;
        const { id, email } = filtro;
        if (id) {
            return db('usuarios').where({ id }).first()
        } else if (email) {
            return db('usuarios').where({ email }).first()
        } else {
            return null;
        }
    },
}