const jwt = require('jwt-simple');
const { perfis: obterPerfis } = require('../Type/Usuario');

module.exports = {
    async getUsuarioLogado(usuario) {
        const perfis = await obterPerfis(usuario);
        const agora = Math.floor(Date.now() / 1000);


        // Esse objeto será usado como payload token:
        const usuarioInfo = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfis: perfis.map(p => p.nome),
            // data de geração do token:
            iat: agora,
            // O token expira em 3 dias:
            exp: agora + (3 * 24 * 60 * 60),
        }
        const authSecret = process.env.APP_AUTH_SECRET;
        return {
            ...usuarioInfo,
            token: jwt.encode(usuarioInfo, authSecret),
        }
    }
}