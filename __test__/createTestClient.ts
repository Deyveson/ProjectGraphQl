import { ApolloServerBase } from 'apollo-server-core';
import { DocumentNode, print } from 'graphql';

type StringOrAst = string | DocumentNode;

// A query must not come with a mutation (and vice versa).
interface Query {
  query: StringOrAst;
  mutation?: undefined;
}

interface Mutation {
  mutation: StringOrAst;
  query?: undefined;
}

export default (server: ApolloServerBase) => {
  const executeOperation = server.executeOperation.bind(server);
  const test = ({ query, mutation, ...args }: Query | Mutation) => {
    const operation = query || mutation;

    if (!operation || (query && mutation)) {
      throw new Error('Either `query` or `mutation` must be passed, but not both.');
    }

    return executeOperation({
      // Convert ASTs, which are produced by `graphql-tag` but not currently
      // used by `executeOperation`, to a String using `graphql/language/print`.
      query: typeof operation === 'string' ? operation : print(operation),
      ...args,
    });
  };

  return { query: test, mutate: test };
};
