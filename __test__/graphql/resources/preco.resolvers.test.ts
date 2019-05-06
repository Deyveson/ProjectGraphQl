import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';
import { gql } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from '../../../src/utils/utils';

describe('Preco resolvers test', () => {
  const secret = `Bearer: ${jwt.sign('123456', JWT_TOKEN_SECRET)}`;

  it('Should return preco', async () => {
    const { server, precoApi } = constructTestServer({ authUser: 1, authorization: secret });
    const { query } = createTestClient(server);

    // @ts-ignore
    precoApi.post = jest.fn(() => [
      {
        unidade: [
          {
            preco: 113.5,
          },
        ],
      },
    ]);

    const res = await query({
      query: gql`
        {
          getPrecos(
            buscaProdutos: [
              {
                condicao: "XXXXXXX"
                descontoItem: 0
                fatorAumento: 0
                filial: 34
                fornecedorCodigo: 144
                fornecedorEmpresa: 1
                produto: "B47097"
                tipoPreco: "N"
                unidadeVenda: "UN"
              }
            ]
          ) {
            unidade {
              preco
            }
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.getPrecos[0]).toHaveProperty('unidade');
  });

  it('Should return condicao de pagamento', async () => {
    const { server, precoApi } = constructTestServer({ authUser: 1, authorization: secret });
    const { query } = createTestClient(server);

    // @ts-ignore
    precoApi.get = jest.fn(() => ({
      retorno: 'XXXXXXX',
    }));

    const res = await query({
      query: gql`
        {
          getCondPgmt(
            buscaCondicao: { operacao: 2, tipoPreco: "N", formaPagamento: "I", prazoMedio: 0 }
          )
        }
      `,
    });
    // @ts-ignore
    expect(res.data.getCondPgmt).not.toBeNull();
  });
});
