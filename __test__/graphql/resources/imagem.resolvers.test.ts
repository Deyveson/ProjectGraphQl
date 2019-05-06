import * as jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from '../../../src/utils/utils';
import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';
import { gql } from 'apollo-server';

describe('Test Image', () => {
  const secret = `Bearer: ${jwt.sign('123456', JWT_TOKEN_SECRET)}`;
  it('test in the image endpoint', async () => {
    const { server, imagemApi } = constructTestServer({ authUser: 1, authorization: secret });
    // @ts-ignore
    imagemApi.post = jest.fn(() => [
      {
        CodFornecedor: '144',
        CodProduto: '16001',
        ImgBase64: '/9j/4AAQSkZJRgABAQAAAQABAAD',
      },
    ]);
    const { query } = createTestClient(server);
    const res = await query({
      query: gql`
        {
          getImagem(buscaImagem: [{ CodFornecedor: "144", CodProduto: "16001" }]) {
            CodFornecedor
            CodProduto
            ImgBase64
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.getImagem[0]).toHaveProperty('ImgBase64');
  });
});
