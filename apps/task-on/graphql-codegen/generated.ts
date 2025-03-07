import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ContentInput = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateTodoArgs = {
  content: Array<ContentInput>;
  editKey: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  readTodo?: Maybe<Array<Maybe<TTodoList>>>;
};


export type QueryReadTodoArgs = {
  uuid: Scalars['String']['input'];
};

export type TContent = {
  __typename?: 'TContent';
  completed: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type TTodoList = {
  __typename?: 'TTodoList';
  content: Array<TContent>;
  editKey: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type ReadTodoQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type ReadTodoQuery = { __typename?: 'Query', readTodo?: Array<{ __typename?: 'TTodoList', uuid: string, editKey: string, content: Array<{ __typename?: 'TContent', id: number, text: string, completed: boolean }> } | null> | null };

export type CreateTodoMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
  editKey: Scalars['String']['input'];
  content: Array<ContentInput> | ContentInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo?: string | null };


export const ReadTodoDocument = gql`
    query ReadTodo($uuid: String!) {
  readTodo(uuid: $uuid) {
    uuid
    editKey
    content {
      id
      text
      completed
    }
  }
}
    `;

/**
 * __useReadTodoQuery__
 *
 * To run a query within a React component, call `useReadTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadTodoQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useReadTodoQuery(baseOptions: Apollo.QueryHookOptions<ReadTodoQuery, ReadTodoQueryVariables> & ({ variables: ReadTodoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReadTodoQuery, ReadTodoQueryVariables>(ReadTodoDocument, options);
      }
export function useReadTodoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadTodoQuery, ReadTodoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReadTodoQuery, ReadTodoQueryVariables>(ReadTodoDocument, options);
        }
export function useReadTodoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReadTodoQuery, ReadTodoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReadTodoQuery, ReadTodoQueryVariables>(ReadTodoDocument, options);
        }
export type ReadTodoQueryHookResult = ReturnType<typeof useReadTodoQuery>;
export type ReadTodoLazyQueryHookResult = ReturnType<typeof useReadTodoLazyQuery>;
export type ReadTodoSuspenseQueryHookResult = ReturnType<typeof useReadTodoSuspenseQuery>;
export type ReadTodoQueryResult = Apollo.QueryResult<ReadTodoQuery, ReadTodoQueryVariables>;
export const CreateTodoDocument = gql`
    mutation CreateTodo($uuid: String!, $editKey: String!, $content: [ContentInput!]!) {
  createTodo(uuid: $uuid, editKey: $editKey, content: $content)
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      editKey: // value for 'editKey'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;