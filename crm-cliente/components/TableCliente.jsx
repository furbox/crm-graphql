import Swal from "sweetalert2";

const TableCliente = ({ cliente }) => {
    const { nombre, apellido, empresa, email, telefono, id } = cliente;
    const eliminarCliente = (id) => {
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText:'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar esto!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'Se ha eliminado.',
                'success'
              )
            }
          })
    }
    return (
        <tr>
            <td className="border border-gray-200 px-4 py-2">{nombre} {apellido}</td>
            <td className="border border-gray-200 px-4 py-2">{empresa}</td>
            <td className="border border-gray-200 px-4 py-2">{email}</td>
            <td className="border border-gray-200 px-4 py-2">
                <button onClick={() => eliminarCliente(id)} className="flex border justify-center border-red-300 p-1 rounded text-red-300 hover:bg-red-300 hover:text-red-50 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg> Eliminar
                </button>
            </td>
        </tr>
    )
}

export default TableCliente;