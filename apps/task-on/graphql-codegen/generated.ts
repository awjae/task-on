import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type ContentInput = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<TTodoItemResponse>;
  createTodoItem?: Maybe<TTodoItemResponse>;
  deleteTodoItem?: Maybe<TTodoItemResponse>;
  updateCompletedTodo?: Maybe<TTodoItemResponse>;
  updateTodo?: Maybe<TTodoResponse>;
};


export type MutationCreateTodoArgs = {
  contents: Array<ContentInput>;
  uuid: Scalars['String']['input'];
};


export type MutationCreateTodoItemArgs = {
  content: ContentInput;
  uuid: Scalars['String']['input'];
};


export type MutationDeleteTodoItemArgs = {
  id: Scalars['Float']['input'];
  uuid: Scalars['String']['input'];
};


export type MutationUpdateCompletedTodoArgs = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['Float']['input'];
  uuid: Scalars['String']['input'];
};


export type MutationUpdateTodoArgs = {
  operations: Scalars['JSON']['input'];
  uuid: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  readTodo: TTodoResponse;
};


export type QueryReadTodoArgs = {
  uuid: Scalars['String']['input'];
};

export type TContent = {
  __typename?: 'TContent';
  completed: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  text: Scalars['String']['output'];
};

export type TResponse = {
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
};

export type TTodoItemResponse = TResponse & {
  __typename?: 'TTodoItemResponse';
  data?: Maybe<TContent>;
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
};

export type TTodoList = {
  __typename?: 'TTodoList';
  contents: Array<TContent>;
  isShared?: Maybe<Scalars['Boolean']['output']>;
  uuid: Scalars['String']['output'];
};

export type TTodoResponse = TResponse & {
  __typename?: 'TTodoResponse';
  data?: Maybe<TTodoList>;
  message?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
};
