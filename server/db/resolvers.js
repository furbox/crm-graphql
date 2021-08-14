const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');
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
        obtenerUsuario: async (_, { }, ctx) => {
            return ctx.usuario;
        },
        obtenerProductos: async () => {
            try {
                const productos = await Producto.find({});
                return productos;
            } catch (error) {
                console.log('[ERROR]: Q-Prod obtenerProductos', error);
                return error;
            }
        },
        obtenerProducto: async (_, { id }) => {
            try {
                const producto = await Producto.findById(id);
                if (!producto) {
                    throw new Error('Producto no encontrado');
                }
                return producto;
            } catch (error) {
                console.log('[ERROR]: Q-Prod obtenerProducto', error);
                return error;
            }
        },
        obtenerClientes: async () => {
            try {
                const clientes = await Cliente.find({});
                return clientes;
            } catch (error) {
                console.log('[ERROR]: Q-Cli obtenerClientes', error);
                return error;
            }
        },
        obtenerClientesVendedor: async (_, { }, ctx) => {
            try {
                const clientes = await Cliente.find({ vendedor: ctx.usuario.id });
                return clientes;
            } catch (error) {
                console.log('[ERROR]: Q-Cli obtenerClientesVendedor', error);
                return error;
            }
        },
        obtenerCliente: async (_, { id }, ctx) => {
            try {
                const cliente = await Cliente.findById(id);
                if (!cliente) {
                    throw new Error('El cliente no existe');
                }

                if (cliente.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este cliente.');
                }

                return cliente;
            } catch (error) {
                console.log('[ERROR]: Q-Cli obtenerCliente', error);
                return error;
            }
        },
        obtenerPedidos: async (_, { }, ctx) => {
            try {
                const pedidos = await Pedido.find();
                return pedidos;
            } catch (error) {
                console.log('[ERROR]: Q-Ped obtenerPedidos', error);
                return error;
            }
        },
        obtenerPedidosVendedor: async (_, { }, ctx) => {
            try {
                const pedidos = await Pedido.find({ vendedor: ctx.usuario.id }).populate('cliente');
                return pedidos;
            } catch (error) {
                console.log('[ERROR]: Q-Ped obtenerPedidosVendedor', error);
                return error;
            }
        },
        obtenerPedido: async (_, { id }, ctx) => {
            try {
                const pedido = await Pedido.findById(id);
                if (!pedido) {
                    throw new Error('El pedido no existe');
                }

                if (pedido.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este pedido.');
                }

                return pedido;
            } catch (error) {
                console.log('[ERROR]: Q-Ped obtenerPedido', error);
                return error;
            }
        },
        ontenerPedidosEstado: async (_, { estado }, ctx) => {
            try {
                const pedidos = await Pedido.find({ vendedor: ctx.usuario.id, estado });
                return pedidos;
            } catch (error) {
                console.log('[ERROR]: Q-Ped ontenerPedidosEstado', error);
                return error;
            }
        },
        mejoresClientes: async () => {
            try {
                const clientes = await Pedido.aggregate([
                    { $match: { estado: "COMPLETADO" } },
                    {
                        $group: {
                            _id: "$cliente",
                            total: { $sum: '$total' }
                        }
                    },
                    {
                        $lookup: {
                            from: 'clientes',
                            localField: '_id',
                            foreignField: "_id",
                            as: "cliente"
                        }
                    },
                    {
                        $sort: { total: -1 }
                    }
                ]);
                return clientes;
            } catch (error) {
                console.log('[ERROR]: Q-Top mejoresClientes', error);
                return error;
            }
        },
        mejoresVendedores: async () => {
            try {
                const vendedores = await Pedido.aggregate([
                    { $match: { estado: "COMPLETADO" } },
                    {
                        $group: {
                            _id: "$vendedor",
                            total: { $sum: '$total' }
                        }
                    },
                    {
                        $lookup: {
                            from: 'usuarios',
                            localField: '_id',
                            foreignField: "_id",
                            as: "vendedor"
                        }
                    },
                    {
                        $limit: 50
                    },
                    {
                        $sort: { total: -1 }
                    }
                ]);
                return vendedores;
            } catch (error) {
                console.log('[ERROR]: Q-Top mejoresVendedores', error);
                return error;
            }
        },
        buscarProducto: async (_, { texto }) => {
            const productos = await Producto.find({ $text: { $search: texto } })
            return productos;
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
                console.log('[ERROR]: M-User nuevoUsuario', error);
                return error;
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input;

            try {
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
            } catch (error) {
                console.log('[ERROR]: M-Auth autenticarUsuario', error);
                return error;
            }
        },
        nuevoProducto: async (_, { input }) => {
            try {
                const producto = new Producto(input);
                await producto.save();
                return producto;
            } catch (error) {
                console.log('[ERROR]: M-Prod nuevoProducto', error);
                return error;
            }
        },
        actualizarProducto: async (_, { id, input }) => {
            try {
                //revisar si el producto existe
                let producto = await Producto.findById(id);
                if (!producto) {
                    throw new Error('El producto no existe!!');
                }
                producto = await Producto.findOneAndUpdate({ _id: id }, input, { new: true });
                return producto;
            } catch (error) {
                console.log('[ERROR]: M-Prod actualizarProducto', error);
                return error;
            }
        },
        eliminarProducto: async (_, { id }) => {
            try {
                //revisar si el producto existe
                let producto = await Producto.findById(id);
                if (!producto) {
                    throw new Error('El producto no existe!!');
                }
                await Producto.findOneAndDelete({ _id: id });
                return "Producto Eliminado"
            } catch (error) {
                console.log('[ERROR]: M-Prod eliminarProducto', error);
                return error;
            }
        },
        nuevoCliente: async (_, { input }, ctx) => {
            const { email } = input;
            try {
                //verificar si el cliente ya se encuentra registrado
                let cliente = await Cliente.findOne({ email });
                if (cliente) {
                    throw new Error('El cliente ya existe');
                }

                cliente = new Cliente(input);

                //asignar vendedor
                cliente.vendedor = ctx.usuario.id;

                //guardar en db
                await cliente.save();
                return cliente;
            } catch (error) {
                console.log('[ERROR]: M-Cli nuevoCliente', error);
                return error;
            }
        },
        actualizarCliente: async (_, { id, input }, ctx) => {
            try {
                //Verificar si el cliente existe
                let cliente = await Cliente.findById(id);
                if (!cliente) {
                    throw new Error('El Cliente no existe');
                }
                //verificar si es cliente del vendedor
                if (cliente.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este cliente.');
                }

                //guardar el cliente
                cliente = await Cliente.findOneAndUpdate({ _id: id }, input, { new: true });
                return cliente;
            } catch (error) {
                console.log('[ERROR]: M-Cli actualizarCliente', error);
                return error;
            }
        },
        eliminarCliente: async (_, { id }, ctx) => {
            try {
                //Verificar si el cliente existe
                let cliente = await Cliente.findById(id);
                if (!cliente) {
                    throw new Error('El Cliente no existe');
                }
                //verificar si es cliente del vendedor
                if (cliente.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este cliente.');
                }

                //guardar el cliente
                cliente = await Cliente.findOneAndDelete({ _id: id });
                return "Cliente Eliminado";
            } catch (error) {
                console.log('[ERROR]: M-Cli actualizarCliente', error);
                return error;
            }
        },
        nuevoPedido: async (_, { input }, ctx) => {
            try {
                //verificar si el cliente existe
                const cliente = await Cliente.findById(input.cliente);
                if (!cliente) {
                    throw new Error('El Cliente no existe');
                }
                //verificar si el cliente es del vendedor
                if (cliente.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este cliente.');
                }
                //Revisar stock
                for await (const articulo of input.pedido) {
                    const { id } = articulo;
                    const producto = await Producto.findById(id);
                    if (articulo.cantidad > producto.existencia) {
                        throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`)
                    } else {
                        producto.existencia = producto.existencia - articulo.cantidad;
                        await producto.save();
                    }
                }
                //crear pedido
                const pedido = new Pedido(input);
                //asignar vendedor
                pedido.vendedor = ctx.usuario.id;
                //Guardar en la db
                await pedido.save();

                return pedido;

            } catch (error) {
                console.log('[ERROR]: M-ped nuevoPedido', error);
                return error;
            }
        },
        actualizarPedido: async (_, { id, input }, ctx) => {
            try {
                const pedido = await Pedido.findById(id);
                if (!pedido) {
                    throw new Error('El pedido no existe');
                }

                if (pedido.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este pedido.');
                }
                //Revisar stock
                if (input.pedido) {
                    for await (const articulo of input.pedido) {
                        const { id, cantidad } = articulo;
                        const producto = await Producto.findById(id);
                        const { nombre, existencia } = producto;
                        if (cantidad > existencia) {
                            throw new Error(`El articulo: ${nombre} excede la cantidad disponible`)
                        } else {
                            const cantidadPrevia = await pedido.pedido.find(item => item.id === id).cantidad;
                            producto.existencia = existencia + cantidadPrevia - cantidad;
                            await producto.save();
                        }

                    }
                }

                //Guardar Pedido en la db
                const pedidoUpdate = await Pedido.findOneAndUpdate({ _id: id }, input, { new: true });

                return pedidoUpdate;
            } catch (error) {
                console.log('[ERROR]: M-Ped actualizarPedido', error);
                return error;
            }
        },
        eliminarPedido: async (_, { id }, ctx) => {
            try {
                const pedido = await Pedido.findById(id);
                if (!pedido) {
                    throw new Error('El pedido no existe');
                }

                if (pedido.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tiene acceso a este pedido.');
                }

                //regresar stock
                for await (const articulo of pedido.pedido) {
                    const { id, cantidad } = articulo;
                    const producto = await Producto.findById(id);
                    producto.existencia = producto.existencia + cantidad;
                    await producto.save();
                }

                //eliminar pedido
                await Pedido.findOneAndDelete({ _id: id });
                return "Pedido Eliminado";
            } catch (error) {
                console.log('[ERROR]: M-Ped eliminarPedido', error);
                return error;
            }
        }
    }
}

module.exports = resolvers;