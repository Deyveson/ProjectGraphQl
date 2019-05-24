import { AuthUser } from './AuthUserInterface';
import { DataSources } from './DataSourcesInterface';
import { DbConnection } from './DbConnectionInterface';

export interface ResolverContext {
  db: DbConnection;
  authorization?: string;
  refreshToken?: string;
  newToken?: string;
  authUser?: AuthUser;
  dataSources: DataSources;
}
