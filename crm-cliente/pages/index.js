import Head from 'next/head';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

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
  if(loading) return 'Cargando...';

  return (
    <div>
      <Layout>
        <Head>
          <title>CRM - Clientes</title>
        </Head>
        <h1 className="text-2xl text-gray-700 font-light">Clientes</h1>
        <table className="rounded table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-700 border border-gray-700">
            <tr className="text-gray-50">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {data.obtenerClientesVendedor.map(cliente => (
              <tr key={cliente.id}>
                <td className="border border-gray-700 px-4 py-2">{cliente.nombre} {cliente.apellido}</td>
                <td className="border border-gray-700 px-4 py-2">{cliente.empresa}</td>
                <td className="border border-gray-700 px-4 py-2">{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}

export default Index;