import * as jwt from 'jsonwebtoken';
import { verifyTokenResolver } from '../../../src/graphql/composable/verify-token.resolver';
import { JWT_TOKEN_SECRET } from '../../../src/utils/utils';

describe('Test verify token resolver', () => {
  it('Should throw when no authorization token provided', () => {
    const resolver = verifyTokenResolver((_, __, ___, ____) => {});
    // @ts-ignore
    expect(() => resolver(null, [], {}, null)).toThrow();
  });

  it('Should throw when jwt is invalid', () => {
    const secret = `Bearer: ${jwt.sign('123456789', '123456789')}`;
    const resolver = verifyTokenResolver((_, __, ___, ____) => {});
    // @ts-ignore
    expect(() => resolver(null, [], { authorization: secret }, null)).toThrow();
  });

  it('Should not throw when jwt is valid', () => {
    const secret = `Bearer: ${jwt.sign('123456789', JWT_TOKEN_SECRET)}`;
    const resolver = verifyTokenResolver((_, __, ___, ____) => {});
    // @ts-ignore
    expect(() => resolver(null, [], { authorization: secret }, null)).not.toThrow();
  });
});
