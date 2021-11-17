const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil.js'); // Renomeia perfil para: obterPerfil
const { usuario: obterUsuario } = require('../Query/usuario.js'); // Renomeia usuario para: obterUsuario

const mutations = {
    registrarUsuario(_, { dados }) {
        return mutations.novoUsuario(_, {
            dados: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
            }
        }) ;
    },
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []
                // se não existir o perfil, cria um do tipo comum
            if(!dados.perfis || dados.perfis.length === 0) {
                dados.perfis = [{
                    nome: 'comum'
                }]
            }
                // Para cada perfil (filtro) dentro de dados,
                for(let filtro of dados.perfis) {
                    // var perfil recebe o return de ObterPerfil
                    const perfil = await obterPerfil(_, { filtro });
                    // Caso receba um return diferente de null, faça...
                    if(perfil) idsPerfis.push(perfil.id)
                }

            // Criptografa a senha
            salt = bcrypt.genSaltSync(10);
            dados.senha = bcrypt.hashSync(dados.senha, salt);
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
        try {
            // Obtém o objeto do usuário a ser alterado
            const usuario = await obterUsuario(_, { filtro });
            // Se existir o objeto do usuário, faça...
            if (usuario) {
                const { id } = usuario; // Pega o id do objeto usuário e guarda na var id
                // Se dentro de dados tiver um atributo chamado perfis, então...
                if (dados.perfis) {
                    // Deleta o perfil associado ao usuário
                    await db('usuarios_perfis')
                        .where({ usuario_id: id }).delete();
                    for (let filtro of dados.perfis) {
                        // var perfil recebe o return de ObterPerfil
                        const perfil = await obterPerfil(_, { filtro });
                        // Se existir o objeto do perfil, faça...
                        // Insere no banco de dados o id do perfil passando o id do obj perfil e o id do usuário passando a var id
                        if (perfil) {
                            await db('usuarios_perfis')
                                .insert({
                                    perfil_id: perfil.id,
                                    usuario_id: id,
                                })
                        } else {
                            throw new Error('Verifique se os Perfis solicitados estão cadastrados');
                        }
                    }
                }
                if (dados.senha) {
                    // Criptografa a senha
                    salt = bcrypt.genSaltSync(10);
                    dados.senha = bcrypt.hashSync(dados.senha, salt);
                }
                // Deleta o atributo perfis dentro de dados antes de inserir o novo usuário,
                // pois não é necessário no banco de dados, já que esse atributo é gerado pelo join
                delete dados.perfis;
                // Atualiza o usuário associado a var id
                await db('usuarios')
                    .where({ id })
                    .update(dados);
            }
            // Se não tiver setado o usuário, é retornado null, caso contrário retorna o obj atualizado
            return !usuario ? null : { ...usuario, ...dados };
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = mutations;