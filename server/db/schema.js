const { gql } = require('apollo-server');


//Schema graphql
const typeDefs = gql`

    type Usuario{
        id:ID
        nombre:String
        apellido:String
        email:String
        createdAt:String
    }

    type Token {
        token: String
    }

    input UsuarioInput {
        nombre:String!
        apellido:String!
        email:String!
        password:String!
    }

    input AutenticarUsuario{
        email: String!,
        password: String!
    }

    type Query{
        obtenerUsuario(token:String!): Usuario
    }

    type Mutation{
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarUsuario): Token
    }
`;

module.exports = typeDefs;