import { useReducer } from "react";
import { types } from "../../types";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

const PedidoState = ({children}) => {
    const initialState = {
        cliente: [],
        productos: [],
        total: 0
    }
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    return (
        <PedidoContext.Provider>
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState