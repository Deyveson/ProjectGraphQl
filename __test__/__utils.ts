import { typeDefs, resolvers } from '../src/graphql/schema';
import { ApolloServer, gql } from 'apollo-server';
import * as dataSources from '../src/graphql/resources/datasources';

export const constructTestServer = ({ authUser = {}, authorization = {} }: any = {}) => {
  const apis = {
    catalogoApi: new dataSources.CatalogoAPI(),
    precoApi: new dataSources.PrecoAPI(),
    geralApi: new dataSources.GeralAPI(),
    imagemApi: new dataSources.ImagemAPI(),
    pessoaApi: new dataSources.PessoaApi(),
  };

  const server = new ApolloServer({
    typeDefs: gql`
      ${typeDefs}
    `,
    resolvers,
    dataSources: () => apis,
    context: () => ({ authUser, authorization }),
  });

  return { server, ...apis };
};
