import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  ping: Scalars['String'];
  pingAuth: Scalars['String'];
  users: Array<User>;
  products: Array<Product>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  tokenVersion: Scalars['Float'];
};

export type Product = {
   __typename?: 'Product';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  imagePath: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  revokeRefreshTokensForUser: Scalars['Boolean'];
  register: Scalars['Boolean'];
  login: LoginResponse;
  createProduct: Scalars['Boolean'];
  updateProduct: Array<Product>;
  deleteProduct: Scalars['Boolean'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateProductArgs = {
  imagePath: Scalars['String'];
  price: Scalars['Float'];
  descirption: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  imagePath: Scalars['String'];
  price: Scalars['Float'];
  descirption: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type PingQueryVariables = {};


export type PingQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'ping'>
);


export const PingDocument = gql`
    query Ping {
  ping
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PingQuery, PingQueryVariables>) {
        return ApolloReactHooks.useQuery<PingQuery, PingQueryVariables>(PingDocument, baseOptions);
      }
export function usePingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, baseOptions);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = ApolloReactCommon.QueryResult<PingQuery, PingQueryVariables>;