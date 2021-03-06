import Swal from "sweetalert2";
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import { useEffect, useState } from "react";


const DELETE_PRODUCTO = gql`
mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
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

const TableProducto = ({ producto }) => {
    const { nombre, existencia, precio, id } = producto;
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
    const [eliminarProducto] = useMutation(DELETE_PRODUCTO, {
        update(cache) {
            //actualizar un cache especifico
            const { obtenerProductos } = cache.readQuery({ query: PRODUCTOS });
            //reescribir cache
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            })
        }
    });

    const btnDeleteProducto = (id) => {
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
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    });
                    setErr(false);
                    setMensaje('Se Elimino el Producto.');
                    setMensaje(null);

                } catch (error) {
                    setErr(true);
                    setMensaje(error.message.toString());
                    setMensaje(null);
                }
            }
        })
    }

    const btnEditarProducto = (id) => {
        Router.push({
            pathname: "/productos/[id]/editar",
            query: { id }
        })
    }

    return (
        <tr>
            <td className="border border-gray-200 px-4 py-2">{nombre}</td>
            <td className="border border-gray-200 px-4 py-2">{existencia}</td>
            <td className="border border-gray-200 px-4 py-2">$ {precio}</td>
            <td className="border border-gray-200 px-4 py-2">
                <div className="flex">
                    <button onClick={() => btnEditarProducto(id)} className="flex ml-2 border justify-center border-gray-800 p-1 rounded text-gray-800 hover:bg-gray-800 hover:text-gray-50 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg> Editar
                    </button>
                    <button onClick={() => btnDeleteProducto(id)} className="flex ml-2 border justify-center border-red-300 p-1 rounded text-red-300 hover:bg-red-300 hover:text-red-50 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg> Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableProducto;