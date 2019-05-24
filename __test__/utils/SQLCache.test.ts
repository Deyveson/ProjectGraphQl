import SQLCache from '../../src/utils/SQLCache';

describe('SQLCache Test', () => {
  it('Should return value when not in cache', async () => {
    const cache = new SQLCache();
    const res = await cache.getCached(function Teste() {
      return Promise.resolve('Teste');
    }, {});
    expect(res).toBe('Teste');
  });

  it('Should not execute function again when in cache', async () => {
    const cache = new SQLCache();
    await cache.getCached(function Teste() {
      return Promise.resolve('Chamada 1');
    }, {});
    const res = await cache.getCached(function Teste() {
      return Promise.resolve('Chamada 2');
    }, {});
    expect(res).toBe('Chamada 1');
  });
});
