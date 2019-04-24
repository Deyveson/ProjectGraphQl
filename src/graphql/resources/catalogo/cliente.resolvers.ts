import { ResolverContext } from '../../../interfaces/ResolverContextInterface'

export const clienteResolvers = {
  Query: {
    getcliente: async (parent, args, { dataSources }: ResolverContext) => {
      const cliente = Object.assign({ args })
      return dataSources.clienteApi.searchCliente(cliente)
    },
  },
}
