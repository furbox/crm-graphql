require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');

//Conectar a mongo
conectarDB();

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const usuario = jwt.verify(token, process.env.JWT_KEY_SECRET);
                return { usuario }
            } catch (error) {
                console.log('[ERROR]: index.js server', error);
            }
        }

    }
});

//arrancar servidor
server.listen().then(({ url }) => {
    console.log(`Servidor listo en la url ${url}`);
});