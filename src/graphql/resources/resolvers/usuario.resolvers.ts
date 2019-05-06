import { gqlCompose, handleError } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const usuarioResolvers = {
  Query: {
    getUsuarios: gqlCompose(...authResolvers)((parent: any, args: any, { db }: ResolverContext) => {
      return db.Usuario.findAll({
        attributes: ['id_usuario', 'nome_usuario', 'login'],
      }).catch(handleError);
    }),

    checkAuth: (parent: any, args: any, { authUser }: ResolverContext) => {
      return !!authUser;
    },
  },
};
