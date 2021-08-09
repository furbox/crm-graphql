const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crearToken = (usuario) => {
    const { id, nombre, apellido, email } = usuario;
    return jwt.sign({ id, nombre, apellido, email }, process.env.JWT_KEY_SECRET, {
        expiresIn: '24h'
    });
}

//Resolvers Graphql
const resolvers = {
    Query: {
        obtenerUsuario: async (_, { token }) => {
            const usuarioId = await jwt.verify(token, process.env.JWT_KEY_SECRET);
            return usuarioId;
        }
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) => {
            const { email, password } = input;

            //revisar si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });
            if (existeUsuario) {
                throw new Error('El usuario se encuentra registrado!!');
            }

            //hashear su password
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            //guarda en la db
            try {
                const usuario = new Usuario(input);
                await usuario.save();
                return usuario;
            } catch (error) {
                console.log('[ERROR]: M-U nuevoUsuario', error)
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input;

            //si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });
            if (!existeUsuario) {
                throw new Error('El usuario no se encuentra registrado!!');
            }

            //revisar si el password es correcto
            const passwordCorrecto = bcryptjs.compareSync(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error('Los datos ingresados son incorrectos');
            }

            //crear el token
            return {
                token: crearToken(existeUsuario)
            }
        }
    }
}

module.exports = resolvers;