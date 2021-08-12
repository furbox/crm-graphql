import Swal from "sweetalert2";
import { useMutation, gql } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from "react";

const DELETE_CLIENT = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
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

const TableCliente = ({ cliente }) => {
    const { nombre, apellido, empresa, email, telefono, id } = cliente;
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
    }, [mensaje]);

    //Mutation para registrar un usuario
    const [eliminarCliente] = useMutation(DELETE_CLIENT, {
        update(cache) {
            //actualizar un cache especifico
            const { obtenerClientesVendedor } = cache.readQuery({ query: CLIENTES });
            //reescribir cache
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: CLIENTES,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
    });

    const btnDelereCliente = (id) => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar esto!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Eliminar por ID
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });
                    setErr(false);
                    setMensaje('Se Elimino el Cliente. Redirigiendo...');
                    setMensaje(null);

                } catch (error) {
                    setErr(true);
                    setMensaje(error.message.toString());
                    setMensaje(null);
                }
            }
        })
    }
    return (
        <tr>
            <td className="border border-gray-200 px-4 py-2">{nombre} {apellido}</td>
            <td className="border border-gray-200 px-4 py-2">{empresa}</td>
            <td className="border border-gray-200 px-4 py-2">{email}</td>
            <td className="border border-gray-200 px-4 py-2">
                <button onClick={() => btnDelereCliente(id)} className="flex border justify-center border-red-300 p-1 rounded text-red-300 hover:bg-red-300 hover:text-red-50 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg> Eliminar
                </button>
            </td>
        </tr>
    )
}

export default TableCliente;