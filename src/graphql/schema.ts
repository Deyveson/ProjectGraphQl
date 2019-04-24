import { clienteResolvers } from './resources/catalogo/cliente.resolvers'
import { merge } from 'lodash'

import { Query } from './query'
import { Mutation } from './mutation'

import { usuarioTypes } from './resources/usuario/usuario.schema'
import { usuarioResolvers } from './resources/usuario/usuario.resolvers'
import { tokenResolvers } from './resources/token/token.resolvers'
import { precoResolvers } from './resources/preco/preco.resolvers'
import { tokenTypes } from './resources/token/token.schema'
import { catalogoResolvers } from './resources/catalogo/catalogo.resolvers'
import { produtoTypes } from './resources/catalogo/catalogo.schema'
import { precoTypes } from './resources/preco/preco.schema'
import { clienteType } from './resources/catalogo/cliente.schema'

const resolvers = merge(
  usuarioResolvers,
  tokenResolvers,
  catalogoResolvers,
  precoResolvers,
  clienteResolvers
)

const typeDefs = [
  Query,
  Mutation,
  usuarioTypes,
  tokenTypes,
  produtoTypes,
  precoTypes,
  clienteType,
]

export { resolvers, typeDefs }
