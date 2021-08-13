import Layout from '../../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import AsignarCliente from '../../components/pedidos/AsignarCliente';
import PedidoContext from '../../context/pedidos/PedidoContext';
import { useContext } from 'react';

const crear = () => {
    const pedidoContext = useContext(PedidoContext);


    return (
        <Layout title="CRM - Crear Pedidos" description="Modulo de Pedidos" headtitle="Crear Pedidos">
            <div className="flex shadow-lg rounded justify-center mt-5 border border-gray-100">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                </div>
            </div>
        </Layout>
    )
}

export default crear;
