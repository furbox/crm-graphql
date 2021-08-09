const { gql } = require('apollo-server');


//Schema graphql
const typeDefs = gql`
    type Query{
        obtenerCurso: String
    }
`;

module.exports = typeDefs;