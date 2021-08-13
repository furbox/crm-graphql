import Layout from '../../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import TableProducto from '../../components/TableProducto';

const PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      createdAt
    }
  }
`;

const Productos = () => {
  //consultar productos
  const { data, loading, error } = useQuery(PRODUCTOS);
  if (loading) return 'Cargando...';
  return (
    <Layout title="CRM - Productos" description="Modulo de Productos" headtitle="Lista de Productos">
      <div className="flex w-full justify-end">
        <Link href="productos/crear">
          <a className="text-gray-900 p-2 font-bold border rounded bg-blue-50 hover:bg-gray-900 hover:text-gray-50"> + Crear Producto</a>
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
          {data.obtenerProductos.map(producto => (
            <TableProducto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Productos;