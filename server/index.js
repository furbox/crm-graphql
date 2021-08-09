require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

//Conectar a mongo
conectarDB();

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//arrancar servidor
server.listen().then(({ url }) => {
    console.log(`Servidor listo en la url ${url}`);
});