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

    type Producto{
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        createdAt:String
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

    input ProductoInput{
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    type Query{
        #Auth
        obtenerUsuario(token:String!): Usuario

        #Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto
    }

    type Mutation{
        #Auth
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarUsuario): Token

        #Productos
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto(id:ID!, input:ProductoInput): Producto
        eliminarProducto(id:ID!): String
    }
`;

module.exports = typeDefs;