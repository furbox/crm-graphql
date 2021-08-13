import { types } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case types.SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }

            break;
        case types.SELECCIONAR_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
            break;

        case types.CANTIDAD_PRODUCTOS:

            break;

        default:
            return state;
    }
}