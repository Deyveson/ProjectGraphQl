import { authResolver } from '../../../src/graphql/composable/auth.resolver';

describe('Test auth resolver', () => {
  it('Should throw when no token and no user', () => {
    const resolver = authResolver((_, __, ___, ____) => {});
    // @ts-ignore
    expect(() => resolver(null, [], {}, null)).toThrow();
  });
});
