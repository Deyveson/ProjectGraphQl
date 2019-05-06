import * as utils from '../../src/utils/utils';

describe('Normalize port', () => {
  it('Should return number when string', () => {
    const port = utils.normalizePort('8080');
    expect(typeof port).toBe('number');
  });

  it('Should return number when number', () => {
    const port = utils.normalizePort(8080);
    expect(typeof port).toBe('number');
  });
});

describe('handleError', () => {
  it('Should throw error in promise', async () => {
    const error = new Error('erro teste');
    error.name = 'Erro1';

    await expect(utils.handleError(error)).rejects.toEqual(
      new Error(`${error.name}: ${error.message}`),
    );
  });
});

describe('throwError', () => {
  it('Should throw error if condition is true', () => {
    expect(() => utils.throwError(true, 'teste')).toThrow();
  });

  it('Should not throw error when condition is false', () => {
    expect(() => utils.throwError(false, 'teste')).not.toThrow();
  });
});
