import { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
const Total = () => {

    //context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { total } = pedidoContext;

    return (
        <div className="flex shadow-lg rounded items-center mt-5 justify-between bg-gray-200 p-3 border-solid border-2 border-gray-300">
            <div className="text-gray-900 text-lg">Total a pagar:</div>
            <p className="text-gray-900 mt-0">$ {total}</p>
        </div>
    )
}

export default Total;
