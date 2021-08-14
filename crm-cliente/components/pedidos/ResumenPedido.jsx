import { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
import ProductoResumen from "./ProductoResumen";


const ResumenPedido = () => {

    //context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { productos } = pedidoContext;


    return (
        <>
            <p className="text-gray-900 font-bold mt-10 my-2 p-2 border-l-4 border-gray-900 bg-gray-100 ">Resumen Pedido</p>
            {productos.length > 0 ? (
            <>
                { productos.map(producto => (
                    <ProductoResumen key={producto.id} producto={producto} />
                )) }
            </>): (<p className="bg-blue-100 w-full p-2 border-b-4 border-blue-600">Agrega un producto</p>)}
        </>
    )
}

export default ResumenPedido
