import React from 'react';
import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    split,
    from,
    gql,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { RefreshMutation } from 'generated/graphql.types';
import { checkIsTokenExpired } from 'utils/helpers/SmallHelpers/tokenValidation.helper';
import { isAuthenticatedVar } from './ApolloVariables.helper';

interface IApolloProviderProps {
    children: React.ReactNode;
}

const refreshMutation = gql`
    mutation Refresh {
        refresh {
            access_token
            refresh_token
        }
    }
`;

export const ApolloProviderLocal = React.memo<IApolloProviderProps>(
    ({ children }) => {
        const httpLink = new HttpLink({
            uri: import.meta.env.VITE_API_URL,
            credentials: 'include',
        });

        const wsLink = new WebSocketLink({
            uri: import.meta.env.VITE_API_WS_URL,
            options: {
                reconnect: true,
                timeout: 2000,
                connectionParams: () => {
                    return {
                        authorization: `Bearer ${localStorage.getItem(
                            'access_token',
                        )}`,
                    };
                },
            },
        });

        const authLink = setContext(async (operation, param) => {
            const access_token = localStorage.getItem('access_token');
            const refresh_token = localStorage.getItem('refresh_token');
            if (access_token) {
                if (
                    checkIsTokenExpired(access_token) &&
                    operation.operationName !== 'Refresh'
                ) {
                    const newTokens = await refresh();
                    if (newTokens) {
                        localStorage.setItem(
                            'access_token',
                            newTokens.access_token,
                        );
                        localStorage.setItem(
                            'refresh_token',
                            newTokens.refresh_token,
                        );
                        return {
                            headers: {
                                ...param.headers,
                                authorization: `Bearer ${newTokens.access_token}`,
                                refresh_token: newTokens.refresh_token,
                            },
                        };
                    }
                }
                return {
                    headers: {
                        ...param.headers,
                        authorization: access_token
                            ? `Bearer ${access_token}`
                            : '',
                        refresh_token,
                    },
                };
            }
        });

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, extensions }) => {
                    // HANDLE ACCESS EXPIRED
                    // if (
                    //     extensions?.response.statusCode === 401 ||
                    //     message === 'Unauthorized'
                    // ) {
                    //     localStorage.removeItem('access_token');
                    //     localStorage.removeItem('refresh_token');
                    //     window.location.pathname = 'signin';
                    //     showError(message);
                    // }
                });
            }

            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
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
            link: from([authLink, errorLink, splitLink]),
            cache: new InMemoryCache({
                typePolicies: {
                    Query: {
                        fields: {
                            getUser(prev) {
                                return {
                                    ...prev,
                                    isAuth: isAuthenticatedVar(),
                                };
                            },
                        },
                    },
                },
            }),
        });

        const refresh = async () => {
            const { data } = await client.mutate<RefreshMutation>({
                mutation: refreshMutation,
            });
            return data?.refresh;
        };

        return <ApolloProvider client={client}>{children}</ApolloProvider>;
    },
);
