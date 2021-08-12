import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <span className="w-1/9 mr-4"><FontAwesomeIcon icon={["fas","user-circle"]} size="2x" /></span>
            <p className="mr-5 mt-1 text-center font-extrabold"> {nombre}</p>
            <button onClick={cerrarSesion} className="border border-gray-500 p-1 rounded-lg" type="button" >
                Cerrar Sesión
            </button>
        </div>
    )
}

export default Header;
