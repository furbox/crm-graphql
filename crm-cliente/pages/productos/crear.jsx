import Layout from "../../components/Layout";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

//consulta graphql para crear un Producto
const CREAR_PRODUCTO = gql`
mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
      createdAt
    }
  }
`;
const PRODUCTOS = gql`
query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      createdAt
    }
  }
`;
const crear = () => {
    //guardar Mensaje
    const [mensaje, setMensaje] = useState(null);
    const [err, setErr] = useState(false);
    useEffect(() => {
        if (mensaje && !err) {
            notification(mensaje, 'success');
        }
        if (mensaje && err) {
            notification(mensaje, 'error');
        }

        function notification(mensaje, icon) {
            Swal.fire({
                position: 'top-end',
                icon,
                title: mensaje,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }, [mensaje]);
    //Mutation para crear un Producto
    const [nuevoProducto] = useMutation(CREAR_PRODUCTO, {
        update(cache, { data: { nuevoProducto } }) {
            //actualizar un cache especifico
            const { obtenerProductos } = cache.readQuery({ query: PRODUCTOS });
            //reescribir cache
            cache.writeQuery({
                query: PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            })
        }
    });

    //routing
    const router = useRouter();

    //validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es obligatorio'),
            existencia: Yup.number().required('La Existencia es obligatoria'),
            precio: Yup.number().required('El Precio es obligatorio')
        }),
        onSubmit: async inputs => {
            const { nombre, existencia, precio } = inputs;
            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia: parseInt(existencia),
                            precio: parseFloat(precio)
                        }
                    }
                });
                setErr(false);
                setMensaje('Producto agregado. Redirigiendo...');
                setMensaje(null);
                setTimeout(() => {
                    router.push('/productos');
                }, 3500)
            } catch (error) {
                setErr(true);
                setMensaje(error.message.toString());
                setMensaje(null)
            }
        }
    });

    return (
        <Layout title="CRM - Nuevo Producto" description="Crear Producto" headtitle="Crear Producto">
            <div className="flex shadow-lg rounded justify-center mt-5 border border-gray-100">
                <div className="w-full max-w-lg">
                    <form onSubmit={formik.handleSubmit} className="px-8 pt-6 pb-8 mb-5 rounded-lg bg-gray-600 border border-gray-50">
                        <div className="mb-5">
                            <label htmlFor="nombre" className="block text-gray-50 text-sm font-bold mb-3">
                                Nombre
                            </label>
                            <input type="text" id="nombre" required placeholder="Nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre} />
                        </div>
                        {
                            formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.nombre}</p></div>
                            ) : null
                        }
                        <div className="mb-5">
                            <label htmlFor="existencia" className="block text-gray-50 text-sm font-bold mb-3">
                                Existencia
                            </label>
                            <input type="text" id="existencia" required placeholder="Existencia" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existencia} />
                        </div>
                        {
                            formik.touched.existencia && formik.errors.existencia ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.existencia}</p></div>
                            ) : null
                        }
                        <div className="mb-5">
                            <label htmlFor="precio" className="block text-gray-50 text-sm font-bold mb-3">
                                Precio
                            </label>
                            <input type="text" id="precio" required placeholder="Precio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio} />
                        </div>
                        {
                            formik.touched.precio && formik.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.precio}</p></div>
                            ) : null
                        }
                        <input type="submit" className="bg-gray-50 border rounded w-full mt-5 p-2 text-gray-900 uppercase hover:bg-gray-400 hover:text-gray-50 hover:border-gray-400" value="Crear" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default crear;