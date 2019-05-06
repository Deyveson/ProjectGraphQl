import * as jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from '../../../src/utils/utils';
import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../../__utils';
import { gql } from 'apollo-server';

describe('Test Pessoa', () => {
  const secret = `Bearer: ${jwt.sign('123456', JWT_TOKEN_SECRET)}`;
  it('endpoint cpf test', async () => {
    const { server, pessoaApi } = constructTestServer({ authUser: 1, authorization: secret });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'KATIA',
      nomeFantasia: 'KATIA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      tipoCadastro: 1,
      emails: [
        {
          id: 926562,
          descricao: 'antonio_igor13@hotmail.com',
          finalidade: 1,
          contato: 'NAO TEM',
        },
      ],
      enderecos: [
        {
          id: 319536,
          inscricaoEstadual: {
            id: 150005,
            inscricao: 'ISENTO',
            contribuinte: 'N',
            validContribuinte: true,
          },
          codPais: 1058,
          infobusca: 0,
          logradouro: 'RUA RIO CUNIUA',
          codUf: 13,
          codMunicipio: 1302603,
          cep: '69089180',
          bairro: 'ARMANDO MENDES',
          numero: '12',
          contato: '-',
          complemento: '-',
          tipo: 1,
          validInfoBusca: true,
          validTipoEndereco: true,
          numeroNulo: false,
          validTipoFiscal: false,
        },
      ],
      telefones: [
        {
          id: 1432263,
          numero: 222222222,
          ddd: 22,
          tipo: 3,
          contato: 'NAO TEM',
        },
      ],
      pessoaFisica: {
        id: 10905700,
        cpf: '02570039241',
        numeroRg: '21112545',
        emissaoRg: '819864000000',
        emissorRg: 'SSP',
        cgf: null,
        inscricaoMunicipal: ' ',
        operIsenta: 'N',
        calcIpi: 'N',
      },
      clientes: {
        id: 145995,
        bloqueio: 'N',
        agruparNotas: 'N',
        cobrador: 'CAR',
        tipoPreco: 'N',
        cartaFianca: 'N',
        valorCarta: 0,
        prazoMedio: 0,
        conceito: 'XX',
        exignfdv: 'N',
        observacao: '-',
        limiteCredito: 0,
        tpEmpresa: '4',
        qtdElevador: 0,
        qtdMecanico: 0,
        qtdVeiculos: 0,
        qtdVendedor: 0,
        linhaLeve: 'S',
        linhaPesada: 'N',
        linhaMedia: 'N',
        linhaOutras: 'N',
        metragemAuto: 0,
        metragemOfic: 0,
        percentualAumento: 0,
      },
    }));

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getPessoa(text: "02570039241") {
            nomeCompleto
            nomeFantasia
            tipoPessoa
            dataCadastro
            tipoCadastro
            emails {
              id
              descricao
              finalidade
              contato
            }
            enderecos {
              id
              inscricaoEstadual {
                id
                inscricao
                contribuinte
                validContribuinte
              }
              codPais
              infobusca
              logradouro
              codUf
              codMunicipio
              cep
              bairro
              numero
              contato
              complemento
              tipo
              validInfoBusca
              validTipoEndereco
              numeroNulo
              validTipoFiscal
            }
            telefones {
              id
              numero
              ddd
              tipo
              contato
            }
            pessoaCadastro {
              id
            }
            clientes {
              id
              bloqueio
              agruparNotas
              cobrador
              tipoPreco
              cartaFianca
              valorCarta
              prazoMedio
              conceito
              exignfdv
              observacao
              limiteCredito
              tpEmpresa
              qtdElevador
              qtdMecanico
              qtdVeiculos
              qtdVendedor
              linhaLeve
              linhaPesada
              linhaMedia
              linhaOutras
              metragemAuto
              metragemOfic
              percentualAumento
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getPessoa).toHaveProperty('nomeCompleto');
  });

  it('endpoint cnpj test', async () => {
    const { server, pessoaApi } = constructTestServer({ authUser: 1, authorization: secret });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'INTEGRACAO TRANSPORTES LTDA',
      nomeFantasia: 'EUCATTUR',
      pessoaJuridica: {
        cnpj: '13484296000105',
        id: '33006',
        inscricaoMunicipal: ' ',
        cgf: ' ',
      },
      clientes: {
        id: 34223,
        tipoPreco: 'N',
        percentualAumento: 1,
      },
      telefones: [
        {
          numero: 991160268,
          ddd: 92,
          tipo: 1,
          contato: 'COMPRAS',
        },
      ],
      emails: [
        {
          descricao: 'almox3_mns@eucatur.com.br',
        },
      ],
      enderecos: [
        {
          logradouro: 'AV. CAMAPUA, SALA 01',
        },
      ],
    }));

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getPessoa(text: "13484296000105") {
            nomeCompleto
            nomeFantasia
            pessoaCadastro {
              ... on PessoaJuridica {
                cnpj
              }
              ... on PessoaFisica {
                cpf
              }
              id
              inscricaoMunicipal
              cgf
            }
            clientes {
              id
              tipoPreco
            }
            telefones {
              numero
              ddd
              tipo
              contato
            }
            emails {
              descricao
            }
            enderecos {
              logradouro
            }
            clientes {
              tipoPreco
              percentualAumento
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getPessoa).toHaveProperty('nomeCompleto');
  });

  it('endpoint test null', async () => {
    const { server, pessoaApi } = constructTestServer({ authUser: 1, authorization: secret });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      nomeCompleto: 'INTEGRACAO TRANSPORTES LTDA',
      nomeFantasia: 'EUCATTUR',
      pessoaJuridica: {
        cnpj: null,
        id: '33006',
        inscricaoMunicipal: ' ',
        cgf: ' ',
      },
      clientes: {
        id: 34223,
        tipoPreco: 'N',
        percentualAumento: 1,
      },
      telefones: [
        {
          numero: 991160268,
          ddd: 92,
          tipo: 1,
          contato: 'COMPRAS',
        },
      ],
      emails: [
        {
          descricao: 'almox3_mns@eucatur.com.br',
        },
      ],
      enderecos: [
        {
          logradouro: 'AV. CAMAPUA, SALA 01',
        },
      ],
    }));

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        {
          getPessoa(text: "13484296000105") {
            nomeCompleto
            nomeFantasia
            pessoaCadastro {
              ... on PessoaJuridica {
                cnpj
              }
              ... on PessoaFisica {
                cpf
              }
              id
              inscricaoMunicipal
              cgf
            }
            clientes {
              id
              tipoPreco
            }
            telefones {
              numero
              ddd
              tipo
              contato
            }
            emails {
              descricao
            }
            enderecos {
              logradouro
            }
            clientes {
              tipoPreco
              percentualAumento
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.getPessoa).not.toBeNull();
  });
});
