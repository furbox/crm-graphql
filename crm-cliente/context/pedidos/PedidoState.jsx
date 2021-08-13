import { useReducer } from "react";
import { types } from "../../types";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

const PedidoState = ({ children }) => {
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    const agregarCliente = cliente => {
        dispatch({
            type: types.SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    const agregarProducto = productos => {
        dispatch({
            type: types.SELECCIONAR_PRODUCTOS,
            payload: productos
        })
    }

    return (
        <PedidoContext.Provider value={{
            agregarCliente,
            agregarProducto
        }}>
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState