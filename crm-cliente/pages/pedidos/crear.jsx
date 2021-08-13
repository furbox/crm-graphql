import Layout from '../../components/Layout';
import AsignarCliente from '../../components/pedidos/AsignarCliente';
import AsignarProductos from '../../components/pedidos/AsignarProductos';


const crear = () => {

    return (
        <Layout title="CRM - Crear Pedidos" description="Modulo de Pedidos" headtitle="Crear Pedidos">
            <div className="flex shadow-lg rounded justify-center mt-5 border border-gray-100">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                </div>
            </div>
        </Layout>
    )
}

export default crear;
