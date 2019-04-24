import { ResolverContext } from '../../../interfaces/ResolverContextInterface'

export const catalogoResolvers = {
  Query: {
    getproduto: async (parent, args, { dataSources }: ResolverContext) => {
      const produto = Object.assign({ args })
      return dataSources.catalogoApi.searchProduto(produto)
    },
  },
}
