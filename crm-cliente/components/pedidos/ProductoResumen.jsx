import { useContext, useEffect, useState } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const ProductoResumen = ({ producto }) => {
    const { nombre, precio } = producto;

    //context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { cantidadProductos, actualizarTotal } = pedidoContext;

    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        actualizarCantidad();
        actualizarTotal()
    }, [cantidad]);

    const actualizarCantidad = () => {
        const nuevoProducto = { ...producto, cantidad: Number(cantidad) }
        cantidadProductos(nuevoProducto);
    }

    return (
        <div className="md:flex md:items-center md:justify-between bg-green-100 w-full p-2 border-l-4 border-green-600">
            <div className="md:w2/4 mb-2 md:mb-0">
                <p>{nombre} $ {precio}</p>
            </div>
            <input
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
                className="shadow appearance-none py-2 px-3 border w-full rounded p-1 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                placeholder="Cantidad"
                type="number" />
        </div>
    )
}

export default ProductoResumen
