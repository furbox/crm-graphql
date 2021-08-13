import Layout from '../../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Select from 'react-select';

const Pedidos = () => (
  <Layout title="CRM - Pedidos" description="Modulo de Pedidos" headtitle="Lista de Pedidos">
    <div className="flex w-full justify-end">
      <Link href="pedidos/crear">
        <a className="text-gray-900 p-2 font-bold border rounded bg-blue-50 hover:bg-gray-900 hover:text-gray-50"> + Crear Pedido</a>
      </Link>
    </div>
    <table className="rounded table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-700 border border-gray-700">
          <tr className="text-gray-50">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Existencia</th>
            <th className="w-1/5 py-2">Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {/* {data.obtenerProductos.map(producto => (
            <TableProducto key={producto.id} producto={producto} />
          ))} */}
        </tbody>
      </table>
  </Layout>
)

export default Pedidos;