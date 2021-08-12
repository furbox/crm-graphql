import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import TableCliente from '../components/TableCliente';

const CLIENTES = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Index = () => {
  //consulta apollo
  const { data, loading, error } = useQuery(CLIENTES);
  if (loading) return 'Cargando...';

  return (
    <div>
      <Layout title="CRM - Clientes" description="Modulo de Clientes" headtitle="Lista de Clientes">
        <div className="flex w-full justify-end">
          <Link href="clientes/crear">
            <a className="text-gray-900 p-2 font-bold border rounded bg-blue-50 hover:bg-gray-900 hover:text-gray-50"> + Crear Cliente</a>
          </Link>
        </div>
        <table className="rounded table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-700 border border-gray-700">
            <tr className="text-gray-50">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {data.obtenerClientesVendedor.map(cliente => (
              <TableCliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Index;