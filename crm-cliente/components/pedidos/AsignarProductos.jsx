import { useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';
import PedidoContext from '../../context/pedidos/PedidoContext';

const PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const AsignarProductos = () => {
    //state local del componente
    const [productos, setProductos] = useState([]);

    //context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;

    //consultar productos
    const { data, loading, error } = useQuery(PRODUCTOS);

    useEffect(() => {
        //TODO: funcion para cambiar el estado
        agregarProducto(productos);
    }, [productos]);

    const seleccionarProductos = (productos) => {
        setProductos(productos);
    }

    if (loading) return 'Cargando...';

    const { obtenerProductos } = data;
    return (
        <>
            <p className="text-gray-900 font-bold mt-10 my-2 p-2 border-l-4 border-gray-900 bg-gray-100 ">Seleccione los Productos</p>
            <Select
                className="mt-3 mb-3"
                isMulti={true}
                options={obtenerProductos}
                onChange={opcion => seleccionarProductos(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                ṕlaceholder="Seleccione Productos"
                noOptionsMessage={() => "No se encontraron clientes"}
            />
        </>
    )
}

export default AsignarProductos
