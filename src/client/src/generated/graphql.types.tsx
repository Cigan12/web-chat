import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type ChatModel = {
    __typename?: 'ChatModel';
    id?: Maybe<Scalars['Int']>;
    messages: Array<MessageModel>;
    name: Scalars['String'];
    type: Scalars['String'];
    users: Array<UserModel>;
};

export type MessageModel = {
    __typename?: 'MessageModel';
    date: Scalars['String'];
    id: Scalars['Int'];
    message: Scalars['String'];
    user: UserModel;
};

export type Mutation = {
    __typename?: 'Mutation';
    refresh: TokensModel;
    sendMessage: Scalars['Boolean'];
    signin: TokensModel;
    signup: Scalars['Boolean'];
    verifyEmail: TokensModel;
};

export type MutationSendMessageArgs = {
    input: SendMessageInput;
};

export type MutationSigninArgs = {
    signInInput: SignInInput;
};

export type MutationSignupArgs = {
    signUpInput: SignUpInput;
};

export type MutationVerifyEmailArgs = {
    token: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    chats: Array<ChatModel>;
    getUser: UserModel;
};

export type QueryChatsArgs = {
    search?: Maybe<Scalars['String']>;
};

export type SendMessageInput = {
    chatId?: Maybe<Scalars['Int']>;
    contactId?: Maybe<Scalars['Int']>;
    message: Scalars['String'];
};

export type SignInInput = {
    login: Scalars['String'];
    password: Scalars['String'];
};

export type SignUpInput = {
    email: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};

export type Subscription = {
    __typename?: 'Subscription';
    chatUpdated: ChatModel;
    newChatCreated: ChatModel;
};

export type TokensModel = {
    __typename?: 'TokensModel';
    access_token: Scalars['String'];
    refresh_token: Scalars['String'];
};

export type UserModel = {
    __typename?: 'UserModel';
    email: Scalars['String'];
    id: Scalars['Int'];
    username: Scalars['String'];
};

export type VerifyEmailMutationVariables = Exact<{
    token: Scalars['String'];
}>;

export type VerifyEmailMutation = {
    __typename?: 'Mutation';
    verifyEmail: {
        __typename?: 'TokensModel';
        access_token: string;
        refresh_token: string;
    };
};

export type RefreshMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshMutation = {
    __typename?: 'Mutation';
    refresh: {
        __typename?: 'TokensModel';
        access_token: string;
        refresh_token: string;
    };
};

export type SignInMutationVariables = Exact<{
    input: SignInInput;
}>;

export type SignInMutation = {
    __typename?: 'Mutation';
    signin: {
        __typename?: 'TokensModel';
        access_token: string;
        refresh_token: string;
    };
};

export type SignUpMutationVariables = Exact<{
    input: SignUpInput;
}>;

export type SignUpMutation = { __typename?: 'Mutation'; signup: boolean };

export type SendMessageMutationVariables = Exact<{
    input: SendMessageInput;
}>;

export type SendMessageMutation = {
    __typename?: 'Mutation';
    sendMessage: boolean;
};

export type GetChatsQueryVariables = Exact<{
    search?: Maybe<Scalars['String']>;
}>;

export type GetChatsQuery = {
    __typename?: 'Query';
    chats: Array<{
        __typename?: 'ChatModel';
        name: string;
        id?: number | null | undefined;
        type: string;
        users: Array<{
            __typename?: 'UserModel';
            id: number;
            email: string;
            username: string;
        }>;
        messages: Array<{
            __typename?: 'MessageModel';
            id: number;
            date: string;
            message: string;
            user: {
                __typename?: 'UserModel';
                id: number;
                email: string;
                username: string;
            };
        }>;
    }>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
    __typename?: 'Query';
    getUser: {
        __typename?: 'UserModel';
        id: number;
        username: string;
        email: string;
    };
};

export type ChatUpdatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChatUpdatedSubscription = {
    __typename?: 'Subscription';
    chatUpdated: {
        __typename?: 'ChatModel';
        name: string;
        id?: number | null | undefined;
        type: string;
        users: Array<{
            __typename?: 'UserModel';
            id: number;
            email: string;
            username: string;
        }>;
        messages: Array<{
            __typename?: 'MessageModel';
            id: number;
            date: string;
            message: string;
            user: {
                __typename?: 'UserModel';
                id: number;
                email: string;
                username: string;
            };
        }>;
    };
};

export type NewChatCreatedSubscriptionVariables = Exact<{
    [key: string]: never;
}>;

export type NewChatCreatedSubscription = {
    __typename?: 'Subscription';
    newChatCreated: {
        __typename?: 'ChatModel';
        name: string;
        id?: number | null | undefined;
        type: string;
        users: Array<{
            __typename?: 'UserModel';
            id: number;
            email: string;
            username: string;
        }>;
        messages: Array<{
            __typename?: 'MessageModel';
            id: number;
            date: string;
            message: string;
            user: {
                __typename?: 'UserModel';
                id: number;
                email: string;
                username: string;
            };
        }>;
    };
};

export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
        verifyEmail(token: $token) {
            access_token
            refresh_token
        }
    }
`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(
    baseOptions?: Apollo.MutationHookOptions<
        VerifyEmailMutation,
        VerifyEmailMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        VerifyEmailMutation,
        VerifyEmailMutationVariables
    >(VerifyEmailDocument, options);
}
export type VerifyEmailMutationHookResult = ReturnType<
    typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
    Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
>;
export const RefreshDocument = gql`
    mutation Refresh {
        refresh {
            access_token
            refresh_token
        }
    }
`;
export type RefreshMutationFn = Apollo.MutationFunction<
    RefreshMutation,
    RefreshMutationVariables
>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RefreshMutation,
        RefreshMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(
        RefreshDocument,
        options,
    );
}
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<
    RefreshMutation,
    RefreshMutationVariables
>;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
        signin(signInInput: $input) {
            access_token
            refresh_token
        }
    }
`;
export type SignInMutationFn = Apollo.MutationFunction<
    SignInMutation,
    SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SignInMutation,
        SignInMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
        SignInDocument,
        options,
    );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
    SignInMutation,
    SignInMutationVariables
>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
        signup(signUpInput: $input)
    }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
    SignUpMutation,
    SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SignUpMutation,
        SignUpMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
        SignUpDocument,
        options,
    );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
    SignUpMutation,
    SignUpMutationVariables
>;
export const SendMessageDocument = gql`
    mutation sendMessage($input: SendMessageInput!) {
        sendMessage(input: $input)
    }
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
    SendMessageMutation,
    SendMessageMutationVariables
>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SendMessageMutation,
        SendMessageMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        SendMessageMutation,
        SendMessageMutationVariables
    >(SendMessageDocument, options);
}
export type SendMessageMutationHookResult = ReturnType<
    typeof useSendMessageMutation
>;
export type SendMessageMutationResult =
    Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
    SendMessageMutation,
    SendMessageMutationVariables
>;
export const GetChatsDocument = gql`
    query GetChats($search: String) {
        chats(search: $search) {
            name
            id
            type
            users {
                id
                email
                username
            }
            messages {
                id
                date
                message
                user {
                    id
                    email
                    username
                }
            }
        }
    }
`;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetChatsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetChatsQuery,
        GetChatsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(
        GetChatsDocument,
        options,
    );
}
export function useGetChatsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetChatsQuery,
        GetChatsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(
        GetChatsDocument,
        options,
    );
}
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<
    typeof useGetChatsLazyQuery
>;
export type GetChatsQueryResult = Apollo.QueryResult<
    GetChatsQuery,
    GetChatsQueryVariables
>;
export const GetUserDocument = gql`
    query GetUser {
        getUser {
            id
            username
            email
        }
    }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
    baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
        GetUserDocument,
        options,
    );
}
export function useGetUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUserQuery,
        GetUserQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
        GetUserDocument,
        options,
    );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
    GetUserQuery,
    GetUserQueryVariables
>;
export const ChatUpdatedDocument = gql`
    subscription ChatUpdated {
        chatUpdated {
            name
            id
            type
            users {
                id
                email
                username
            }
            messages {
                id
                date
                message
                user {
                    id
                    email
                    username
                }
            }
        }
    }
`;

/**
 * __useChatUpdatedSubscription__
 *
 * To run a query within a React component, call `useChatUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatUpdatedSubscription(
    baseOptions?: Apollo.SubscriptionHookOptions<
        ChatUpdatedSubscription,
        ChatUpdatedSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        ChatUpdatedSubscription,
        ChatUpdatedSubscriptionVariables
    >(ChatUpdatedDocument, options);
}
export type ChatUpdatedSubscriptionHookResult = ReturnType<
    typeof useChatUpdatedSubscription
>;
export type ChatUpdatedSubscriptionResult =
    Apollo.SubscriptionResult<ChatUpdatedSubscription>;
export const NewChatCreatedDocument = gql`
    subscription NewChatCreated {
        newChatCreated {
            name
            id
            type
            users {
                id
                email
                username
            }
            messages {
                id
                date
                message
                user {
                    id
                    email
                    username
                }
            }
        }
    }
`;

/**
 * __useNewChatCreatedSubscription__
 *
 * To run a query within a React component, call `useNewChatCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewChatCreatedSubscription(
    baseOptions?: Apollo.SubscriptionHookOptions<
        NewChatCreatedSubscription,
        NewChatCreatedSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        NewChatCreatedSubscription,
        NewChatCreatedSubscriptionVariables
    >(NewChatCreatedDocument, options);
}
export type NewChatCreatedSubscriptionHookResult = ReturnType<
    typeof useNewChatCreatedSubscription
>;
export type NewChatCreatedSubscriptionResult =
    Apollo.SubscriptionResult<NewChatCreatedSubscription>;
