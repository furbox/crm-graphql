
import { useEffect, useState } from 'react';
import Select from 'react-select';

const clientes = [
    { id: '1', nombre: 'Chocolate' },
    { id: '2', nombre: 'Strawberry' },
    { id: '3', nombre: 'Vanilla' },
];

const AsignarCliente = () => {
    const [cliente, setCliente] = useState([]);
    useEffect(() => {
        console.log(cliente);

    }, [cliente]);

    const seleccionarCliente = cliente => {
        setCliente(cliente);
    }

    return (
        <>
            <p>Seleccione un cliente</p>
            <Select
                options={clientes}
                onChange={seleccionarCliente}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => opciones.nombre}
                ṕlaceholder="Seleccione Cliente"
                noOptionsMessage={() => "No se encontraron clientes"}
            />
        </>
    )
}

export default AsignarCliente
