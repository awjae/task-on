import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';
import { commonTypeDefs } from './type/common';
import { todoTypeDefs } from './type/todo';
import { todoResolvers } from './resolvers/todo';
import { checkAndConnectDB } from '@libs/mongoose';

/**
 * NOTE: API 만드는 절차
 * 1. todoTypeDefs 정의
 * 2. resolver 정의
 * 3. Test 정의 + query 정의
 * 4. task-on:code-gen codegen 돌리기
 * 5. [front] api 연동
 */

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