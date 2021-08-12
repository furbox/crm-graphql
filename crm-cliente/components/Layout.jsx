import Head from 'next/head';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import Header from './Header';
import PropTypes from 'prop-types';
import HeadTitle from './HeadTitle';

const Layout = ({ children, title, description, headtitle }) => {
    //routing de next
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
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
                            <Header />
                            <HeadTitle headtitle={headtitle} />
                            {children}
                        </main>
                    </div>
                </div>
            )}


        </>
    )
}

Layout.defaultProps = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    headtitle: PropTypes.string.isRequired
}

export default Layout
