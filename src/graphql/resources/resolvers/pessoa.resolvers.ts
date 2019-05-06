import { gqlCompose } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const pessoaResolvers = {
  Query: {
    getPessoa: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        return await dataSources.pessoaApi.searchPessoa(args.text);
      },
    ),
  },
  PessoaCadastro: {
    __resolveType(obj, context, info) {
      if (obj.cpf) {
        return 'PessoaFisica';
      } else if (obj.cnpj) {
        return 'PessoaJuridica';
      } else {
        return null;
      }
    },
  },
};
