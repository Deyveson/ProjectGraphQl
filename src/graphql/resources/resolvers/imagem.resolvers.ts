import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { authResolvers } from '../../composable/auth.resolver';
import { handleError, gqlCompose } from '../../../utils/utils';

export const imagemResolvers = {
  Query: {
    getImagem: gqlCompose(...authResolvers)(
      async (parent, { buscaImagem }, { dataSources }: ResolverContext) => {
        return dataSources.imagemApi.searchImagem(buscaImagem).catch(handleError);
      },
    ),
  },
};
