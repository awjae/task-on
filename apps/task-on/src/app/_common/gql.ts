import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client =  process.env.NODE_ENV === 'test' ? null :
  new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });