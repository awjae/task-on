import gql from 'graphql-tag';

export const commonTypeDefs = gql`
  interface TResponse {
    message: String
    status: Int!
    success: Boolean!
  }

  # 비어있으면 extend 못씀
  # type Query {}
  # type Mutation {}
`;