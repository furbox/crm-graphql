
import { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Select from 'react-select';
import PedidoContext from '../../context/pedidos/PedidoContext';


const CLIENTES = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

const AsignarCliente = () => {
    //consulta apollo
    const [cliente, setCliente] = useState([]);

    //context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente } = pedidoContext;

    const { data, loading, error } = useQuery(CLIENTES);

    const seleccionarCliente = cliente => {
        agregarCliente(cliente);
    }

    if (loading) return 'Cargando...';

    const { obtenerClientesVendedor } = data;

    return (
        <>
            <p className="text-gray-900 font-bold mt-10 my-2 p-2 border-l-4 border-gray-900 bg-gray-100 ">Seleccione un cliente</p>
            <Select
                className="mt-3 mb-3"
                options={obtenerClientesVendedor}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => opciones.nombre}
                ṕlaceholder="Seleccione Cliente"
                noOptionsMessage={() => "No se encontraron clientes"}
            />
        </>
    )
}

export default AsignarCliente
