import React from 'react';
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
            <p className="mr-5">{nombre}</p>
            <button onClick={cerrarSesion} className="border border-gray-500 p-1 rounded-lg" type="button" >Cerrar Sesión</button>
        </div>
    )
}

export default Header;
