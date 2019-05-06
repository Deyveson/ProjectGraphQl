import { formatError } from '../../../src/graphql/response';
import { ApolloError } from 'apollo-server';
import { UNAUTHORIZED, FORBIDDEN } from '../../../src/environment';

describe('Response Errors', () => {
  it('Should return response error messages and status code when authenticate unauthorized', () => {
    const error = new ApolloError(UNAUTHORIZED);

    expect(formatError(error)).toHaveProperty('status');
    expect(formatError(error)).toHaveProperty('message');
    expect(formatError(error).status).toBe(401);
  });

  it('Should return response error messages and status code when authenticate forbidden', () => {
    const error = new ApolloError(FORBIDDEN);

    expect(formatError(error)).toHaveProperty('status');
    expect(formatError(error)).toHaveProperty('message');
    expect(formatError(error).status).toBe(403);
  });

  it('Should return response error messages and status general', () => {
    const error = new Error('error code');

    expect(formatError(error)).not.toHaveProperty('status');
  });
});
