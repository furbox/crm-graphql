import Layout from "../../../components/Layout";
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

//consulta graphql para crear un producto
const EDITAR_PRODUCTO = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
      createdAt
    }
  }
`;

const PRODUCTO = gql`
query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
      createdAt
    }
  }
`;

const editar = () => {
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

    //Mutation para crear un producto
    const [actualizarProducto, { data: d, loading: l, error: er }] = useMutation(EDITAR_PRODUCTO);

    //routing
    const router = useRouter();
    const { query: { id } } = router;
    //consultar para obtener producto
    const { data, loading, error } = useQuery(PRODUCTO, {
        variables: {
            id
        }
    });

    //schema de validacion
    const validationSchema = Yup.object({
        nombre: Yup.string().required('El Nombre es obligatorio'),
        existencia: Yup.number().required('La Existencia es obligatoria'),
        precio: Yup.number().required('El Precio es obligatorio')
    });

    if (loading) return 'Cargando...';

    const { obtenerProducto } = data;

    const updateProducto = async (inputs) => {
        const { nombre, existencia, precio } = inputs;
        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencia: parseInt(existencia),
                        precio: parseFloat(precio)
                    }
                }
            });
            setErr(false);
            setMensaje('Producto actualizado. Redirigiendo...');
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

    return (
        <Layout title="CRM - Editar Producto" description="Editar Producto" headtitle="Editar Producto">
            <div className="flex shadow-lg rounded justify-center mt-5 border border-gray-100">
                <div className="w-full max-w-lg">
                    <Formik validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={obtenerProducto}
                        onSubmit={(values) => {
                            updateProducto(values)
                        }}>
                        {props => {
                            return (
                                <form onSubmit={props.handleSubmit}
                                    className="px-8 pt-6 pb-8 mb-5 rounded-lg bg-gray-600 border border-gray-50">
                                    <div className="mb-5">
                                        <label htmlFor="nombre" className="block text-gray-50 text-sm font-bold mb-3">
                                            Nombre
                                        </label>
                                        <input type="text" id="nombre" required placeholder="Nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre} />
                                    </div>
                                    {
                                        props.touched.nombre && props.errors.nombre ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{props.errors.nombre}</p></div>
                                        ) : null
                                    }
                                    <div className="mb-5">
                                        <label htmlFor="existencia" className="block text-gray-50 text-sm font-bold mb-3">
                                            Existencia
                                        </label>
                                        <input type="text" id="existencia" required placeholder="Existencia" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existencia} />
                                    </div>
                                    {
                                        props.touched.existencia && props.errors.existencia ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{props.errors.existencia}</p></div>
                                        ) : null
                                    }
                                    <div className="mb-5">
                                        <label htmlFor="precio" className="block text-gray-50 text-sm font-bold mb-3">
                                            Precio
                                        </label>
                                        <input type="text" id="precio" required placeholder="Precio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.precio} />
                                    </div>
                                    {
                                        props.touched.precio && props.errors.precio ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{props.errors.precio}</p></div>
                                        ) : null
                                    }
                                    <input type="submit" className="bg-gray-50 border rounded w-full mt-5 p-2 text-gray-900 uppercase hover:bg-gray-400 hover:text-gray-50 hover:border-gray-400" value="Actualizar" />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}

export default editar;