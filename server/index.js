const { ApolloServer, gql } = require('apollo-server');

//Servidor
const server = new ApolloServer();

//arrancar servidor
server.listen().then(({url}) => {
    console.log(`Servidor listo en la url ${url}`);
});