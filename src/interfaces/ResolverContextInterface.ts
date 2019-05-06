import { AuthUser } from './AuthUserInterface';
import { DbConnection } from './DbConnectionInterface';
import { DataSources } from './DataSourcesInterface';

export interface ResolverContext {
  db: DbConnection;
  authorization?: string;
  refreshToken?: string;
  newToken?: string;
  authUser?: AuthUser;
  dataSources: DataSources;
}
