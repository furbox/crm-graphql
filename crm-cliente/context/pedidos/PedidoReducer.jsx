import { types } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case types.SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }
        case types.SELECCIONAR_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        case types.CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        case types.ACTUALIZAR_TOTAL:
            return {
                ...state,
                total: state.productos.reduce((nuevoTotal, articulo) => nuevoTotal += articulo.precio * articulo.cantidad, 0)
            }
        default:
            return state;
    }
}