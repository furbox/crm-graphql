import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const AUTH = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
            email
        }
    }
`;

const Header = () => {

    //query apollo
    const { data, loading, error } = useQuery(AUTH);
    //routing de next
    const router = useRouter();

    if (loading) return 'Cargando...';

    const { nombre } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('Stoken');
        router.push('/login');
    }
    return (
        <div className="flex justify-end">

            <p className="flex mr-5 mt-1 text-center font-extrabold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> <span className="text-center m-1"> {nombre}</span> </p>
            <button onClick={cerrarSesion} className="border border-gray-500 p-1 rounded-lg" type="button" >
                Cerrar Sesión
            </button>
        </div>
    )
}

export default Header;
