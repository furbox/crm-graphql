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

    const agregarCliente = (cliente) => {
        

        dispatch({
            type: types.SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    const agregarProducto = (productos) => {
        let nuevoState;
        if (state.productos.length > 0) {
            nuevoState = productos.map(p => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === p.id);
                return {
                    ...producto,
                    ...nuevoObjeto
                }
            })
        } else {
            nuevoState = productos;
        }
        dispatch({
            type: types.SELECCIONAR_PRODUCTOS,
            payload: nuevoState
        })
    }

    //modificar las cantidades de los productos
    const cantidadProductos = (producto) => {
        dispatch({
            type: types.CANTIDAD_PRODUCTOS,
            payload: producto
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: types.ACTUALIZAR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider value={{
            cliente: state.cliente,
            productos: state.productos,
            total: state.total,
            agregarCliente,
            agregarProducto,
            cantidadProductos,
            actualizarTotal
        }}>
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState