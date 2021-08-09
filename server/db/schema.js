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

    type Cliente{
        id: ID
        nombre: String
        apellido:String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
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

    input ClienteInput{
        nombre: String!
        apellido:String!
        empresa: String!
        email: String!
        telefono: String!
    }

    type Query{
        #Auth
        obtenerUsuario(token:String!): Usuario

        #Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        #Clientes
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id: ID!): Cliente
    }

    type Mutation{
        #Auth
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarUsuario): Token

        #Productos
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto(id:ID!, input:ProductoInput): Producto
        eliminarProducto(id:ID!): String

        #Clientes
        nuevoCliente(input: ClienteInput): Cliente
    }
`;

module.exports = typeDefs;