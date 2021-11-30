import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { CookiesProvider } from 'react-cookie';
import { GlobalThemeProvider } from 'theme/Theme.provider';
import { GlobalStyle } from 'theme/GlobalStyles.styled';
import { App } from './App';
import 'utils/Translation/i18n.util';

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_API_URL,
});

const wsLink = new WebSocketLink({
    uri: import.meta.env.VITE_API_WS_URL,
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    credentials: 'include',
});

ReactDOM.render(
    <GlobalThemeProvider>
        <CookiesProvider>
            <ApolloProvider client={client}>
                <GlobalStyle />
                <App />
            </ApolloProvider>
        </CookiesProvider>
    </GlobalThemeProvider>,
    document.getElementById('root'),
);
