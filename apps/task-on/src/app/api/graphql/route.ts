import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';
import { commonTypeDefs } from './type/common';
import { todoTypeDefs } from './type/todo';
import { todoResolvers } from './resolvers/todo';
import { checkAndConnectDB } from '@libs/mongoose';

const typeDefs = gql`
  ${commonTypeDefs}
  ${todoTypeDefs}
`;

const resolvers = {
  ...todoResolvers
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [{
    async requestDidStart({ contextValue }) {
      await checkAndConnectDB();
      return {};
    }
  }]
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => {
    return ({ req });
  },
});

export { handler as GET, handler as POST };