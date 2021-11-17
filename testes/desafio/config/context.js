module.exports = async ({ req }) => {
    // Em desenvolvimento
    await require('./simularUsuarioLogado')(req)
    const auth = req.headers.authorization; // Espera receber o token JWT dentro do cabeçalho da requisição

    console.log(auth);
}