import { ApolloServer, gql } from 'apollo-server';
import { DataSources } from 'apollo-server-core/dist/requestPipeline';
import * as jwt from 'jsonwebtoken';
import { refreshTokens } from './authentication/handleTokens';
import { JWT } from './environment';
import getConfig from './environment/datasources.config';
import * as dataSources from './graphql/resources/datasources';
import { formatError } from './graphql/response';
import { resolvers, typeDefs } from './graphql/schema';
import { DataSources as B2BDataSources } from './interfaces/DataSourcesInterface';
import { getDbConnection } from './models';
import { JWT_TOKEN_SECRET } from './utils/utils';

class App {
  public apollo: any;

  constructor() {
    this.init();
  }

  private init(): void {
    this.middleware();
  }

  private middleware(): void {
    const dtSourceConfig = getConfig();
    const db = getDbConnection();

    this.apollo = new ApolloServer({
      typeDefs: gql`
        ${typeDefs}
      `,
      resolvers,
      dataSources: (): DataSources<B2BDataSources> => ({
        catalogoApi: new dataSources.CatalogoAPI(dtSourceConfig),
        precoApi: new dataSources.PrecoAPI(dtSourceConfig),
        geralApi: new dataSources.GeralAPI(dtSourceConfig),
        imagemApi: new dataSources.ImagemAPI(dtSourceConfig),
        pessoaApi: new dataSources.PessoaApi(dtSourceConfig),
        pedidoService: new dataSources.PedidoService(db),
        usuarioService: new dataSources.UsuarioService(db),
      }),
      formatError: err => formatError(err),
      context: async ({ req, res }: any) => {
        const authorization: string | null = req.headers[JWT.HEADER.TOKEN.NAME] as string;
        const token: string = authorization ? authorization.split(' ')[1] : '';

        const rToken: string | null = req.headers[JWT.HEADER.REFRESH_TOKEN.NAME] as string;
        const refreshToken: string = rToken ? rToken.split(' ')[1] : '';

        if (token) {
          try {
            const { sub }: any = jwt.verify(token, JWT_TOKEN_SECRET);

            return {
              authorization,
              refreshToken,
              authUser: {
                id: sub,
              },
            };
          } catch (err) {
            if (refreshToken) {
              const {
                token: newToken,
                refreshToken: newRefreshToken,
                id,
              }: any = await refreshTokens(refreshToken);

              res.set('Access-Control-Expose-Headers', '*');
              res.set(JWT.HEADER.TOKEN.NAME, newToken);
              res.set(JWT.HEADER.REFRESH_TOKEN.NAME, newRefreshToken);

              return {
                authorization: `Bearer ${newToken}`,
                refreshToken,
                authUser: {
                  id,
                },
              };
            }
          }
        }
        return {};
      },
    });
  }
}

export default new App().apollo;
