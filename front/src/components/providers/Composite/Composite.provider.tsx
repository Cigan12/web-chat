import React, { useCallback } from 'react';
import { CookiesProvider } from 'react-cookie';
import { GlobalThemeProvider } from 'theme/Theme.provider';
import { GlobalStyle } from 'theme/GlobalStyles.styled';
import { ApolloProviderLocal } from '../Apollo/Apollo.provider';

export const CompositeProvider: React.FC = ({ children }) => {
    const showError = useCallback((message: string) => {
        alert(message);
    }, []);

    return (
        <GlobalThemeProvider>
            <CookiesProvider>
                <GlobalStyle />
                <ApolloProviderLocal showError={showError}>
                    {children}
                </ApolloProviderLocal>
            </CookiesProvider>
        </GlobalThemeProvider>
    );
};
