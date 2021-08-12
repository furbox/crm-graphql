import Layout from "../../components/Layout";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

//consulta graphql para crear un cliente
const CREAR_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
        id
        nombre
        apellido
        empresa
        email
        telefono
    }
  }
`;
const CLIENTES = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
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
    //Mutation para crear un cliente
    const [nuevoCliente] = useMutation(CREAR_CLIENTE, {
        update(cache, { data: { nuevoCliente} }) {
            //actualizar un cache especifico
            const { obtenerClientesVendedor } = cache.readQuery({ query: CLIENTES });
            //reescribir cache
            cache.writeQuery({
                query: CLIENTES,
                data: {
                    obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
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
            apellido: '',
            empresa: '',
            email: '',
            telefono: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es obligatorio'),
            apellido: Yup.string().required('El Apellido es obligatorio'),
            empresa: Yup.string().required('La Empresa es obligatoria'),
            email: Yup.string().email('El Email no es valido').required('El Email es obligatorio'),
            telefono: Yup.string().required('El Telefono es obligatorio')
        }),
        onSubmit: async inputs => {
            const { nombre, apellido, empresa, email, telefono } = inputs;
            try {
                const { data } = await nuevoCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                });
                setErr(false);
                setMensaje('Cliente agregado. Redirigiendo...');
                setMensaje(null);
                setTimeout(() => {
                    router.push('/');
                }, 3500)
            } catch (error) {
                setErr(true);
                setMensaje(error.message.toString());
                setMensaje(null)
            }
        }
    });

    return (
        <Layout title="CRM - Nuevo Cliente" description="Crear Cliente" headtitle="Crear Cliente">
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
                            <label htmlFor="apellido" className="block text-gray-50 text-sm font-bold mb-3">
                                Apellido
                            </label>
                            <input type="text" id="apellido" required placeholder="Apellido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido} />
                        </div>
                        {
                            formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.apellido}</p></div>
                            ) : null
                        }
                        <div className="mb-5">
                            <label htmlFor="empresa" className="block text-gray-50 text-sm font-bold mb-3">
                                Empresa
                            </label>
                            <input type="text" id="empresa" required placeholder="Empresa" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa} />
                        </div>
                        {
                            formik.touched.empresa && formik.errors.empresa ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.empresa}</p></div>
                            ) : null
                        }
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-gray-50 text-sm font-bold mb-3">
                                Email
                            </label>
                            <input type="email" id="email" required placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email} />
                        </div>
                        {
                            formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.email}</p></div>
                            ) : null
                        }
                        <div className="mb-5">
                            <label htmlFor="telefono" className="block text-gray-50 text-sm font-bold mb-3">
                                Telefono
                            </label>
                            <input type="text" id="telefono" required placeholder="Telefono" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono} />
                        </div>
                        {
                            formik.touched.telefono && formik.errors.telefono ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.telefono}</p></div>
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