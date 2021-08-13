import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {

  return (
    <Layout title="CRM - Dashboard" description="CRM Dashboard" headtitle="Dashboard">
      <div className="flex">
        <div className="w-1/3 bg-gray-200 p-5 m-2 rounded border text-center text-2xl">
          <Link href="/clientes"> Clientes</Link>
        </div>
        <div className="w-1/3 bg-gray-200 p-5 m-2 rounded border text-center text-2xl">
          <Link href="/productos" > Productos</Link>
        </div>
        <div className="w-1/3 bg-gray-200 p-5 m-2 rounded border text-center text-2xl">
          <Link href="/pedidos" > Pedidos</Link>
        </div>
      </div>

    </Layout>
  )
}

export default Index;