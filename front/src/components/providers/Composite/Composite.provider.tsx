import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { GlobalThemeProvider } from 'theme/Theme.provider';
import { GlobalStyle } from 'theme/GlobalStyles.styled';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProviderLocal } from '../Apollo/Apollo.provider';
import { AuthModalsProvider } from '../AuthModals/AuthModals.provider';
import { NotificationModalsProvider } from '../NotificationModals/NotificationModals.provider';

export const CompositeProvider: React.FC = ({ children }) => {
    return (
        <GlobalThemeProvider>
            <CookiesProvider>
                <GlobalStyle />
                <ApolloProviderLocal>
                    <NotificationModalsProvider>
                        <Router>
                            <AuthModalsProvider>{children}</AuthModalsProvider>
                        </Router>
                    </NotificationModalsProvider>
                </ApolloProviderLocal>
            </CookiesProvider>
        </GlobalThemeProvider>
    );
};
