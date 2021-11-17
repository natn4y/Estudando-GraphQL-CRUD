const db = require('./db');
const { getUsuarioLogado } = require('../resolvers/comum/usuario');

// Simulando um usuário logado:

/*
    seleciona todos os atributos do usuário
    usuario terá o apelido de 'u'
    ...
*/
const sql = `
    select
        u.*
    from
        usuarios u,
        usuarios_perfis up,
        perfis p
    where
        up.usuario_id = u.id and
        up.perfil_id = p.id and
        u.ativo = 1 and
        p.nome = :nomePerfil
    limit 1
`
const getUsuario = async nomePerfil => {
    const res = await db.raw(sql, { nomePerfil })
    return res ? res[0][0] : null
}

module.exports = async req => {
	// Pega o nome do perfil do usuário
    const usuario = await getUsuario('admin');
	// Se o usuário tiver sido encontrado:
    if(usuario) {
		// Joga o usuário para getUsuarioLogado(), essa função retorna um token
        const { token } = await getUsuarioLogado(usuario);
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}