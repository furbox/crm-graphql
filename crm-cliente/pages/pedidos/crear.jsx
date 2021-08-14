import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AsignarCliente from '../../components/pedidos/AsignarCliente';
import AsignarProductos from '../../components/pedidos/AsignarProductos';
import ResumenPedido from '../../components/pedidos/ResumenPedido';
import Total from '../../components/pedidos/Total';
import PedidoContext from '../../context/pedidos/PedidoContext';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const CREAR_PEDIDO = gql` 
    mutation nuevoPedido($input: PedidoInput) {
        nuevoPedido(input: $input) {
            id
        }
    }
`;

const crear = () => {

    const pedidoContext = useContext(PedidoContext);
    const { cliente, productos, total } = pedidoContext;

    const [nuevoPedido] = useMutation(CREAR_PEDIDO);

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

    //routing
    const router = useRouter();

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : ""
    }

    const crearNuevoPedido = async () => {
        const pedido = productos.map(({ existencia, __typename, ...producto }) => producto);
        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: cliente.id,
                        total,
                        pedido
                    }
                }
            });
            setErr(false);
            setMensaje('Pedido agregado. Redirigiendo...');
            setMensaje(null);
            setTimeout(() => {
                router.push('/pedidos');
            }, 3500)
        } catch (error) {
            setErr(true);
            setMensaje(error.message.toString());
            setMensaje(null)
        }
    }

    return (
        <Layout title="CRM - Crear Pedidos" description="Modulo de Pedidos" headtitle="Crear Pedidos">
            <div className="flex shadow-lg h-full rounded justify-center mt-5 border border-gray-100">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />
                    <button onClick={() => crearNuevoPedido()} className={`text-gray-900 w-full mt-5 p-2 font-bold border border-gray-800 rounded bg-blue-50 hover:bg-gray-900 hover:text-gray-50 ${validarPedido()}`}>Crear Pedido</button>
                </div>
            </div>
        </Layout>
    )
}

export default crear;
