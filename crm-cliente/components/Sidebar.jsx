import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
    //routing de next
    const router = useRouter();
    return (
        <aside className="bg-gray-700 sm:w-1/4 xl:w-1/5 sm:min-h-screen">
            <div className="bg-gray-900 w-1/1 border-4 border-gray-900 p-5 border-opacity-25 shadow-inner">
                <p className="text-gray-400 text-3xl font-black text-center">CRM</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-gray-50 font-bold text-xl text-gray-900" : "text-gray-400"}>
                    <Link href="/">
                        <a className="p-3 w1/1 block hover:bg-gray-50 hover:text-gray-900">Clientes</a>
                    </Link>
                </li>
                <li className={router.pathname === "/pedidos" ? "bg-gray-50 font-bold text-xl text-gray-900" : "text-gray-400"}>
                    <Link href="/pedidos">
                        <a className="p-3 w1/1 block hover:bg-gray-50 hover:text-gray-900">Pedidos</a>
                    </Link>
                </li>
                <li className={router.pathname === "/productos" ? "bg-gray-50 font-bold text-xl text-gray-900" : "text-gray-400"}>
                    <Link href="/productos">
                        <a className="p-3 w1/1 block hover:bg-gray-50 hover:text-gray-900">Productos</a>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar
