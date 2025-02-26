'use client';
import { ApolloProvider } from '@apollo/client';
import { client } from './_common/gql';

export default function Container({
  children
}: {
  children: React.ReactNode;
}) {

  return <ApolloProvider client={ client }>
    { children }
  </ApolloProvider>;
}