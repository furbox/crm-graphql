import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    //routing de next
    const router = useRouter();
    return (
        <>
            <Head>
                <title>CRM - Administracion de Clientes</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
            </Head>

            {router.pathname === "/login" || router.pathname === "/register" ? (
                <div className="bg-gray-900 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 min-h-screen">
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="sm:w-3/4 xl:w-4/5 sm:min-h-screen p-5">
                            {children}
                        </main>
                    </div>
                </div>
            )}


        </>
    )
}

export default Layout
