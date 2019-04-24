import { resolvers, typeDefs } from './graphql/schema'
import db from './models'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from './utils/utils'
import * as dataSources from './graphql/datasource'
import { DataSources } from './interfaces/DataSourcesInterface'

const { ApolloServer } = require('apollo-server')

class App {
  public apollo: any

  constructor() {
    this.init()
  }

  private init(): void {
    this.middleware()
  }

  private middleware(): void {
    this.apollo = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: (): DataSources => ({
        catalogoApi: new dataSources.CatalogoAPI(),
        precoApi: new dataSources.PrecoAPI(),
        clienteApi: new dataSources.ClienteAPI(),
      }),
      context: ({ req }: any) => {
        const authorization: string = req.headers.authorization as string
        const token: string = authorization ? authorization.split(' ')[1] : ''

        if (!token) {
          return {
            authorization,
            db,
          }
        }

        return jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
          if (err) {
            return {
              authorization,
              db,
            }
          }

          return {
            authorization,
            db,
            authUser: {
              id: decoded.sub,
            },
          }
        })
      },
    })
  }
}

export default new App().apollo
