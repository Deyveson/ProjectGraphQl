import { createTokens, refreshTokens } from '../../src/authentication/handleTokens';
import * as jwt from 'jsonwebtoken';
import { JWT_TOKEN_REFRESH_SECRET } from '../../src/utils/utils';

describe('Handle tokens', () => {
  it('Should create tokens', async () => {
    const [token, refreshToken]: any = await createTokens({ id: 1 });

    expect(token).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('Should refresh tokens when refresh token is valid', async () => {
    const [token, refreshToken]: any = await createTokens({
      id: 1,
      refreshTokenSecret: 1 + JWT_TOKEN_REFRESH_SECRET,
    });

    expect(token).toBeDefined();
    expect(refreshToken).toBeDefined();

    const { token: newToken, refreshToken: newRefreshToken, id }: any = await refreshTokens(
      refreshToken,
    );

    expect(newToken).toBeDefined();
    expect(newRefreshToken).toBeDefined();
    expect(id).toBeDefined();
  });

  it('Should refresh tokens when refresh token is invalid', async () => {
    expect(await refreshTokens('123456789')).toEqual({});
  });

  it('Should refresh tokens when refresh token payload is not correct', async () => {
    const rToken = jwt.sign({ test: '12312' }, JWT_TOKEN_REFRESH_SECRET);

    expect(await refreshTokens(rToken)).toEqual({});
  });
});
