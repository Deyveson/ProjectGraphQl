export interface DbMockInterface {
  [key: string]: DbMockInstance;
}

interface DbMockInstance {
  model: { [key: string]: any };
  options?: DbMockOptions;
}

interface DbMockOptions {
  instanceMethods: { [key: string]: any };
  sequelize?: { [key: string]: any };
}
