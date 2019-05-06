import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';
import { gql } from 'apollo-server';

describe('Preco resolvers test', () => {
  const { server, geralApi } = constructTestServer();
  const { query } = createTestClient(server);

  it('Should return saldoCliente', async () => {
    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        limite: 0,
        em_aberto: 0,
        saldo: 0,
        aviso: 'teste',
        permissao: null,
        bloqueado: '',
      },
    ]);

    const res = await query({
      query: gql`
        {
          getSaldoCliente(cpfCnpj: "00488260221") {
            limite
            saldo
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.getSaldoCliente).toHaveProperty('saldo');
  });
});
