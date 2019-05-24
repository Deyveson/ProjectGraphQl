import { DataSource } from 'apollo-datasource';
import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DbConnectionInterface';
import SQLCache from '../utils/SQLCache';

import sequelize = require('sequelize');

export class SQLDataSource extends DataSource {
  protected static cache: SQLCache;
  protected db: DbConnection;
  protected getCached: <TFindOptions>(
    dbFn: (opts: sequelize.FindOptions<TFindOptions>) => any,
    opts: sequelize.FindOptions<TFindOptions>,
  ) => any;
  protected context: any;
  constructor(db?) {
    super();
    this.db = db ? db : getDbConnection();
    if (SQLDataSource.cache === undefined) {
      SQLDataSource.cache = new SQLCache();
    }
    this.getCached = SQLDataSource.cache.getCached.bind(SQLDataSource.cache);
  }

  public initialize(config) {
    this.context = config.context;
  }
}

export function getDbConnection(): DbConnection {
  const basename: string = path.basename(module.filename);
  const env: string = process.env.NODE_ENV || 'development';
  let config = require(path.resolve(`${__dirname}./../config/db_config.json`))[env];

  const db = {};

  const operatorsAliases = {
    $in: Sequelize.Op.in,
  };

  config = Object.assign({ operatorsAliases }, config);

  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );

  fs.readdirSync(__dirname)
    .filter((file: string) => {
      const fileSlice: string = file.slice(-3);
      return (
        file.indexOf('.') !== 0 && file !== basename && (fileSlice === '.js' || fileSlice === '.ts')
      );
    })
    .forEach((file: string) => {
      const model: any = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;
  return db as DbConnection;
}
