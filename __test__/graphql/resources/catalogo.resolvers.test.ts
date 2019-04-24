import { createTestClient } from 'apollo-server-testing'
import { constructTestServer } from '../../__utils'
import { gql } from 'apollo-server'
import { CatalogoAPI } from '../../../src/graphql/datasource'

describe('Test Catalog', () => {
  it('product object test', () => {
    const defaultProduto = {
      id: 1,
      idEmpresa: 1,
      idFornecedor: 144,
      nomeFornecedor: 'COFAP',
      codigoProduto: 'B47097',
      codigoOriginalProduto: null,
      nomeProduto: 'AMORTECEDOR TRASEIRO COFAP',
      frequencia: 2182,
      codProduto: '1___144___B47097',
      score: null,
      tags: null,
      carType: null,
      carId: null,
      articleNo: null,
      manuId: null,
      models: [
        {
          nomeCarro: 'GOL',
          modelTipos: [
            {
              tipoNome: 1000,
              geracao: 'I',
              motor: '1.0',
              anos: ['1992', '1993', '1994', '1995', '1996'],
              nomeMotor: 'CHT',
              modeloTransmissao: null,
              eixoMotriz: null,
            },
          ],
        },
      ],
    }

    const resp = new CatalogoAPI().produtoReducer(defaultProduto)

    expect(resp).toEqual(defaultProduto)
  })

  it('test on request response', async () => {
    const { server, catalogoApi } = constructTestServer()

    // @ts-ignore
    catalogoApi.get = jest.fn(() => ({
      produtos: {
        content: [
          {
            id: '64616',
            idEmpresa: '1',
            idFornecedor: '144',
            nomeFornecedor: 'COFAP',
            codigoProduto: 'B47097',
            codigoOriginalProduto: null,
            nomeProduto: 'AMORTECEDOR TRASEIRO COFAP',
            frequencia: 2182,
            codProduto: '1___144___B47097',
            score: null,
            tags: null,
            carType: null,
            carId: null,
            articleNo: null,
            manuId: null,
            models: [
              {
                nomeCarro: 'GOL',
                modelTipos: [
                  {
                    tipoNome: '1000',
                    geracao: 'I',
                    motor: '1.0',
                    anos: ['1992', '1993', '1994', '1995', '1996'],
                    nomeMotor: 'CHT',
                    modeloTransmissao: null,
                    eixoMotriz: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    }))

    const { query } = createTestClient(server)

    const res = await query({
      query: gql`
        {
          getproduto(text: "Amortecedor") {
            id
            idEmpresa
            idFornecedor
            nomeProduto
            frequencia
            codProduto
            score
            tags
            carType
            carId
            articleNo
            manuId
            models {
              nomeCarro
              modelTipos {
                tipoNome
                geracao
                motor
                anos
                nomeMotor
                modeloTransmissao
                eixoMotriz
              }
            }
          }
        }
      `,
    })

    // @ts-ignore
    expect(res.data.getproduto[0]).toHaveProperty('nomeProduto')
  })

  it('catalog test and client endpoint', async () => {
    const { server, clienteApi } = constructTestServer()

    // @ts-ignore
    clienteApi.get = jest.fn(() => ({
      clientes: {
        content: [
          {
            id: '02570039241',
            nome: 'KATIA',
            municipio: 'MANAUS',
            cnpj: null,
            cpf: '02570039241',
            estado: 'AMAZONAS',
            bairro: 'ARMANDO MENDES',
            endereco: 'RUA RIO CUNIUA 12',
            cep: '69089180',
          },
        ],
      },
    }))

    const { query } = createTestClient(server)

    const res = await query({
      query: gql`
        {
          getcliente(text: "Katia") {
            id
            nome
            municipio
            estado
            bairro
            endereco
            cep
          }
        }
      `,
    })

    // @ts-ignore
    expect(res.data.getcliente[0]).toHaveProperty('nome')
  })

  // it('catalog application endpoint test', async () => {
  //
  //   const { server, aplicacoesApi } = constructTestServer()
  //
  //   aplicacoesApi.get = jest.fn(() => (
  //     [
  //       {
  //         aplicacao: 'GOL',
  //         inicio: '1/1900',
  //         fim: '12/1999',
  //         original: ' ',
  //       },
  //     ]
  //   ))
  //
  //   const { query } = createTestClient(server)
  //
  //   const res = await query({
  //     query: gql`
  //           {
  //               getAplicacoes(buscaAplicacoes: {
  //                   empresa: 1,
  //                   fornecedor: "144",
  //                   produto: "B47097"
  //               })
  //           }
  //       `,
  //   })
  //
  //   expect(res.data.getAplicacoes[0]).toHaveProperty('aplicacao')
  // })
})
