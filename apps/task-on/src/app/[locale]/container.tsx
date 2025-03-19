'use client';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { client } from '../_common/gql';

export default function Container({
  children
}: {
  children: React.ReactNode;
}) {

  return <ApolloProvider client={ client as ApolloClient<NormalizedCacheObject> }>
    { children }
  </ApolloProvider>;
}