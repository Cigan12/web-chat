import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';
import { GlobalThemeProvider } from 'theme/Theme.provider';
import { GlobalStyle } from 'theme/GlobalStyles.styled';
import { App } from './App';
import 'utils/Translation/i18n.util';

const client = new ApolloClient({
    uri: import.meta.env.VITE_API_URL,
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
