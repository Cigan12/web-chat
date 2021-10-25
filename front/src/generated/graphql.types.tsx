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

export type Mutation = {
    __typename?: 'Mutation';
    toggleTest: Scalars['Boolean'];
};

export type Query = {
    __typename?: 'Query';
    test: TestData;
};

export type TestData = {
    __typename?: 'TestData';
    id: Scalars['Int'];
    string: Scalars['String'];
};

export type TestMutationMutationVariables = Exact<{ [key: string]: never }>;

export type TestMutationMutation = {
    __typename?: 'Mutation';
    toggleTest: boolean;
};

export type TestQueryQueryVariables = Exact<{ [key: string]: never }>;

export type TestQueryQuery = {
    __typename?: 'Query';
    test: { __typename?: 'TestData'; id: number; string: string };
};

export const TestMutationDocument = gql`
    mutation TestMutation {
        toggleTest
    }
`;
export type TestMutationMutationFn = Apollo.MutationFunction<
    TestMutationMutation,
    TestMutationMutationVariables
>;

/**
 * __useTestMutationMutation__
 *
 * To run a mutation, you first call `useTestMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testMutationMutation, { data, loading, error }] = useTestMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useTestMutationMutation(
    baseOptions?: Apollo.MutationHookOptions<
        TestMutationMutation,
        TestMutationMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        TestMutationMutation,
        TestMutationMutationVariables
    >(TestMutationDocument, options);
}
export type TestMutationMutationHookResult = ReturnType<
    typeof useTestMutationMutation
>;
export type TestMutationMutationResult =
    Apollo.MutationResult<TestMutationMutation>;
export type TestMutationMutationOptions = Apollo.BaseMutationOptions<
    TestMutationMutation,
    TestMutationMutationVariables
>;
export const TestQueryDocument = gql`
    query TestQuery {
        test {
            id
            string
        }
    }
`;

/**
 * __useTestQueryQuery__
 *
 * To run a query within a React component, call `useTestQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQueryQuery(
    baseOptions?: Apollo.QueryHookOptions<
        TestQueryQuery,
        TestQueryQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<TestQueryQuery, TestQueryQueryVariables>(
        TestQueryDocument,
        options,
    );
}
export function useTestQueryLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        TestQueryQuery,
        TestQueryQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<TestQueryQuery, TestQueryQueryVariables>(
        TestQueryDocument,
        options,
    );
}
export type TestQueryQueryHookResult = ReturnType<typeof useTestQueryQuery>;
export type TestQueryLazyQueryHookResult = ReturnType<
    typeof useTestQueryLazyQuery
>;
export type TestQueryQueryResult = Apollo.QueryResult<
    TestQueryQuery,
    TestQueryQueryVariables
>;
