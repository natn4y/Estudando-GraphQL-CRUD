import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

        // AppoloLink
        const httpLink = createHttpLink({
            uri: 'http://localhost:4000/',
        })

        // AppoloLink
        // Aqui é definido a parte de autenticação do link e mandar para o backend o header com o token
        const authLink = setContext((_, { headers }) => {
            // Pega o token do localStorage
            const token = localStorage.getItem('token');
            return {
                // retorna um objeto com os headers
                headers: {
                    // Pega todos os headers sem sobrescrever, e acrescenta o authorization, se você tiver o token, caso contrário, passa o authorization vazio
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '', // O autorization vazio significa que no backend não vai deixar você entrar em consultas e mutations que precisa do autoriazation setado
                },
            }
        })

 // Como foi colocado o ApolloClient em Vue.prototype.$api, você tem a disposição toda a sua aplicação a partir do 'this.$api'
 globalThis.$api = new ApolloClient({ // É comum usar o '$' quando você cria alguma coisa global, isso evita conflitos
    link: authLink.concat(httpLink), // Uma vez que você seta um link, você precisa setar o cache
    cache: new InMemoryCache(), // O padrão que vamos usar é o cache em memória
})