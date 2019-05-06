import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

export const geralResolvers = {
  Query: {
    getSaldoCliente: (parent, { cpfCnpj }, { dataSources }: ResolverContext) => {
      return dataSources.geralApi.findSaldoClienteByCpfCnpj(cpfCnpj);
    },
  },
};
