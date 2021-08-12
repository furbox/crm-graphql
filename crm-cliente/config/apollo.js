import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

const authLink = setContext((_, { headers }) => {
    //verificar token en el storage
    const token = localStorage.getItem('Stoken');
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache,
    link: authLink.concat(httpLink)
});

export default client;