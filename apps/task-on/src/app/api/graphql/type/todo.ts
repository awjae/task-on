import gql from 'graphql-tag';

export const todoTypeDefs = gql`
  type TTodoList {
    uuid: String!
    editKey: String!
    content: [TContent!]!
  }

  type TContent {
    id: Float!
    text: String!
    completed: Boolean!
  }

  input ContentInput {
    id: Float!
    text: String!
    completed: Boolean!
  }

  type TTodoResponse implements TResponse {
    message: String
    status: Int!
    data: TTodoList
  }
  type TTodoItemResponse implements TResponse {
    message: String
    status: Int!
    data: TContent
  }

  type Query {
    readTodo(uuid: String!): TTodoResponse!
  }

  type Mutation {
    createTodo(uuid: String!, editKey: String!, content: [ContentInput!]!): TTodoItemResponse
    updateCompletedTodo(uuid: String!, id: Float!, completed: Boolean!): TTodoItemResponse
    deleteTodoItem(uuid: String!, id: Float!): TTodoItemResponse
  }
`;