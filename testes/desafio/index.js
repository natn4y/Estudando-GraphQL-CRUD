require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');

const { join } = require('path')
const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { UrlLoader } = require('@graphql-tools/url-loader')
const { JsonFileLoader } = require('@graphql-tools/json-file-loader')

const typeDefs = loadSchemaSync(join(__dirname, './schema/index.graphql'), {
    loaders: [new GraphQLFileLoader()]
})

const resolvers = require('./resolvers/index.js')

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server executando em: ${url}`);
});