const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    // Simula um usuário logado:
    await require('./simularUsuarioLogado')(req) //! COMENTE ESSA LINHA PARA DESATIVAR A SIMULAÇÃO DE USUÁRIO LOGADO
    //console.log(req.body)

    // Espera que a partir do front-end tenha sido mandado o Header Authorization
    // Espera receber o token JWT dentro do cabeçalho da requisição
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let usuario = null
    let admin = false

    if (token) {
        try {
            // Usa o process.env.SECRET para tentar decodificar o token
            let conteudoToken = jwt.decode(token,
                process.env.APP_AUTH_SECRET)
            // Verifica se a data de expiração do token é maior que a data atual
            if (new Date(conteudoToken.exp * 1000) > new Date()) {
                usuario = conteudoToken
            }
        } catch (e) {
            // token inválido
        }
    }
    // Se tem usuário, e o usuário tem perfis, verifica se tem o perfil admin
    if (usuario && usuario.perfis) {
        admin = usuario.perfis.includes('admin')
    }
    // Cria um Erro
    const err = new Error('Acesso negado!')
    console.log(`Usuário Logado:`, usuario)
    return {
        usuario,
        admin,
        validarUsuario() {
            if (!usuario) throw err // Se não tiver usuário
        },
        validarAdmin() { // Se o usuário não for admin...
            if (!admin) throw err //! COMENTE ESSA LINHA PARA DESATIVAR A VALIDAÇÃO DE ADMIN
        },
        validarUsuarioFiltro(filtro) {
            if (admin) return // Se o usuário for admin, não precisa validar
            //porque um user admin pode alterar um novo usuário

            if (!usuario) throw err // Se o usuário não tiver setado, ou seja, se ele não foi obtido a partir do token
            if (!filtro) throw err // Se filtro não tiver setado, dá erro porque não é permitido alterar um usuário sem filtro

            const { id, email } = filtro
            if (!id && !email) throw err
            // Se o id tiver setado e for diferente do id do usuário logado:
            if (id && id !== usuario.id) throw err
            // Se o email tiver setado e for diferente do email do usuário logado:
            if (email && email !== usuario.email) throw err
        }
    }
}