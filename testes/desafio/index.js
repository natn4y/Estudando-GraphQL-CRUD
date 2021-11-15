const { join } = require('path')
const { loadSchemaSync } = require('@graphql-tools/load')
const { addResolversToSchema } = require('@graphql-tools/schema')
const { UrlLoader } = require('@graphql-tools/url-loader')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { JsonFileLoader } = require('@graphql-tools/json-file-loader')

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = loadSchemaSync(join(__dirname, './schema/index.graphql'), {
    loaders: [new GraphQLFileLoader()]
})

const resolvers = require('./resolvers/index.js')

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers
})

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schemaWithResolvers,
  graphiql: true,
}));
app.listen(4000, () => console.log('Executando em: http://localhost:4000/graphql'));