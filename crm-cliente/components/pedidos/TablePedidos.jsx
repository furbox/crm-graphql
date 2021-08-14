import Swal from "sweetalert2";
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import { useEffect, useState } from "react";



const TablePedidos = ({ pedido: p }) => {
    const { id, total, cliente, estado, pedido } = p;
    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState('');

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido);
        }
        clasePedido();
    }, [estadoPedido]);

    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClase('bg-yellow-50')
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('bg-green-50')
        } else {
            setClase('bg-red-50')
        }
    }

    return (
        <tr className={`${clase}`}>
            <td className="border border-gray-200 px-4 py-2">
                {estado === 'PENDIENTE' && (<span className="bg-yellow-100 rounded p-2 border border-gray-500">PENDIENTE</span>)}
                {estado === 'COMPLETADO' && (<span className="bg-green-100 rounded p-2 border border-gray-500">COMPLETADO</span>)}
                {estado === 'CANCELADO' && (<span className="bg-red-100 rounded p-2 border border-gray-500">CANCELADO</span>)}
            </td>
            <td className="border border-gray-200 px-4 py-2">$ {total}</td>
            <td className="border border-gray-200 px-4 py-2">
                <p className="font-bold"><span className="font-light">Cliente: </span>{cliente.nombre} {cliente.apellido}</p>
                <p></p>
            </td>
            <td className="border border-gray-200 px-4 py-2">
                {pedido.map(ped => (
                    <p className="bg-gray-200 p-1">{ped.nombre} - {ped.cantidad}</p>
                ))}
            </td>
            <td className="border border-gray-200 px-4 py-2">
                <div className="flex">
                    <button
                        // onClick={() => btnEditarCliente(id)} 
                        className="flex ml-2 border justify-center border-gray-800 p-1 rounded text-gray-800 hover:bg-gray-800 hover:text-gray-50 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg> Editar
                    </button>
                    <button
                        // onClick={() => btnDeleteCliente(id)} 
                        className="flex ml-2 border justify-center border-red-300 p-1 rounded text-red-300 hover:bg-red-300 hover:text-red-50 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg> Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TablePedidos;
