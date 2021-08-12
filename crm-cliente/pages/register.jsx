import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

//consulta graphql para registrar un usuario
const REGISTER = gql`
  mutation nuevoUsuario($input: UsuarioInput){
    nuevoUsuario(input: $input){
      id
      nombre
      apellido
      email
    }
  }
`;

const Register = () => {
  //guardar Mensaje
  const [mensaje, setMensaje] = useState(null);
  const [err, setErr] = useState(false)

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
  }, [mensaje])



  //Mutation para registrar un usuario
  const [nuevoUsuario] = useMutation(REGISTER);

  //routing
  const router = useRouter();

  //validacion del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El Nombre es obligatorio'),
      apellido: Yup.string().required('El Apellido es obligatorio'),
      email: Yup.string().email('El Email no es valido').required('El Email es obligatorio'),
      password: Yup.string().required('El Password es obligatorio')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "El password debe contener al menos 8 Caracteres, Una Mayúscula, Una Minúscula, Un Numero y un caracter especial (@$!%*#?&)"
        )
    }),
    onSubmit: async inputs => {
      const { nombre, apellido, email, password } = inputs;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre, apellido, email, password
            }
          }
        });
        setErr(false);
        setMensaje('Cuenta registrada Satifactoriamente, puedes iniciar Sesión');
        setMensaje(null);
        setTimeout(() => {
          router.push('/login');
        },3500)
      } catch (error) {
        setErr(true);
        setMensaje(error.message.toString());
        setMensaje(null)
      }
    }
  });

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-center text-gray-50 font-light">Registrarse</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <div className="mb-5">
                <label htmlFor="nombre" className="block text-gray-900 text-sm font-bold mb-2">Nombre</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} type="text" id="nombre" required placeholder="Nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {
                formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.nombre}</p></div>
                ) : null
              }
              <div className="mb-5">
                <label htmlFor="apellido" className="block text-gray-900 text-sm font-bold mb-2">Apellido</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.apellido} type="text" id="apellido" required placeholder="Apellido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {
                formik.touched.apellido && formik.errors.apellido ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.apellido}</p></div>
                ) : null
              }
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-900 text-sm font-bold mb-2">Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" required placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {
                formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.email}</p></div>
                ) : null
              }
              <div className="mb-5">
                <label htmlFor="password" className="block text-gray-900 text-sm font-bold mb-2">Password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" required placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              {
                formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2"><p className="font-bold">Error</p><p>{formik.errors.password}</p></div>
                ) : null
              }
              <input type="submit" className="bg-gray-900 border rounded w-full mt-5 p-2 text-gray-50 uppercase hover:bg-gray-50 hover:text-gray-900 hover:border-gray-900" value="Registrarse" />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Register;