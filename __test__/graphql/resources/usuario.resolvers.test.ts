import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { hashSync } from 'bcryptjs';
import { UsuarioMethods } from '../../../src/models/UsuarioModel';
import { constructTestServer } from '../../__utils';

describe('Test usuario resolvers', () => {
  const dbMocks = {
    Usuario: {
      model: {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: 'thalyson',
        email: 'teste@teste.com',
        senha: 123456,
      },
    },
  };
  const { server } = constructTestServer({ authorization: true, dbMocks });

  it('Should return all users', async () => {
    const client = createTestClient(server);
    const res = await client.query({
      query: gql`
        {
          getUsuarios {
            email
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.getUsuarios[0].email).toBe('teste@teste.com');
  });

  it('Should return check auth', async () => {
    const client = createTestClient(server);
    const res = await client.query({
      query: gql`
        {
          checkAuth
        }
      `,
    });
    // @ts-ignore
    expect(res.data.checkAuth).toBe(true);
  });
});
describe('Test token resolvers', () => {
  it('Should throw when credentials empty', async () => {
    const { server } = constructTestServer({ authorization: true });

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: gql`
        mutation {
          createToken(login: "", senha: "") {
            token
            refreshToken
            usuario {
              login
              perfil {
                nome_perfil
              }
              pessoa {
                nomeCompleto
                nomeFantasia
                tipoPessoa
                saldo {
                  saldo
                }
                pessoaCadastro {
                  ... on PessoaFisica {
                    cpf
                  }
                  ... on PessoaJuridica {
                    cnpj
                  }
                }
              }
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.createToken).toBeNull();
  });

  it('Should throw when no user found', async () => {
    const { server, pessoaApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      id: 116029,
      nomeCompleto: 'MARIO ALMEIDA',
      nomeFantasia: 'MARIO ALMEIDA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      pessoaFisica: {
        id: 10905700,
        cpf: '33517308293',
        numeroRg: '21112545',
        emissaoRg: '819864000000',
        emissorRg: 'SSP',
        cgf: null,
        inscricaoMunicipal: ' ',
        operIsenta: 'N',
        calcIpi: 'N',
      },
    }));

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          createToken(login: "335173082937", senha: "123") {
            token
            refreshToken
            usuario {
              login
              perfil {
                nome_perfil
              }
              pessoa {
                nomeCompleto
                nomeFantasia
                tipoPessoa
                saldo {
                  saldo
                }
                pessoaCadastro {
                  ... on PessoaFisica {
                    cpf
                  }
                  ... on PessoaJuridica {
                    cnpj
                  }
                }
              }
            }
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.createToken).toBeNull();
  });

  it('Should return token when credentials user PF is correct', async () => {
    const dbMocks = {
      Usuario: {
        model: {
          id_usuario: 1,
          nome_usuario: 'thalyson',
          login: '33517308293',
          email: 'teste@teste.com',
          senha: hashSync('123'),
          status_usuario: 'A',
          perfis: [{ nome_perfil: 'Teste' }],
        },
        options: {
          instanceMethods: UsuarioMethods,
        },
      },
    };

    const { server, pessoaApi, geralApi } = constructTestServer({ authorization: true, dbMocks });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      id: 116029,
      nomeCompleto: 'MARIO ALMEIDA',
      nomeFantasia: 'MARIO ALMEIDA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      pessoaFisica: {
        id: 10905700,
        cpf: '33517308293',
        numeroRg: '21112545',
        emissaoRg: '819864000000',
        emissorRg: 'SSP',
        cgf: null,
        inscricaoMunicipal: ' ',
        operIsenta: 'N',
        calcIpi: 'N',
      },
    }));
    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        limite: 0,
        em_aberto: 0,
        saldo: 0,
        aviso: null,
        permissao: null,
        bloqueado: '',
      },
    ]);

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          createToken(login: "33517308293", senha: "123") {
            token
            refreshToken
            usuario {
              login
              perfil {
                nome_perfil
              }
              pessoa {
                nomeCompleto
                nomeFantasia
                tipoPessoa
                saldo {
                  saldo
                }
                pessoaCadastro {
                  ... on PessoaFisica {
                    cpf
                  }
                  ... on PessoaJuridica {
                    cnpj
                  }
                }
              }
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.createToken).toHaveProperty('token');
  });

  it('Should return null when password user is incorrect', async () => {
    const { server, pessoaApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      id: 116029,
      nomeCompleto: 'MARIO ALMEIDA',
      nomeFantasia: 'MARIO ALMEIDA',
      tipoPessoa: 'PF',
      dataCadastro: '1542772800000',
      pessoaFisica: {
        id: 10905700,
        cpf: '33517308293',
        numeroRg: '21112545',
        emissaoRg: '819864000000',
        emissorRg: 'SSP',
        cgf: null,
        inscricaoMunicipal: ' ',
        operIsenta: 'N',
        calcIpi: 'N',
      },
    }));

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          createToken(login: "33517308293", senha: "1243") {
            token
            refreshToken
            usuario {
              login
              perfil {
                nome_perfil
              }
              pessoa {
                nomeCompleto
                nomeFantasia
                tipoPessoa
                saldo {
                  saldo
                }
                pessoaCadastro {
                  ... on PessoaFisica {
                    cpf
                  }
                  ... on PessoaJuridica {
                    cnpj
                  }
                }
              }
            }
          }
        }
      `,
    });

    // @ts-ignore
    expect(res.data.createToken).toBeNull();
  });

  it('Should throw when no pessoa found', async () => {
    const { server, pessoaApi } = constructTestServer({ authorization: true });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      id: 116029,
      nomeCompleto: 'MARIO ALMEIDA',
      nomeFantasia: 'MARIO ALMEIDA',
      tipoPessoa: 'PJ',
      dataCadastro: '1542772800000',
      pessoaFisica: {
        id: 10905700,
        cpf: '33517308298',
        numeroRg: '21112545',
        emissaoRg: '819864000000',
        emissorRg: 'SSP',
        cgf: null,
        inscricaoMunicipal: ' ',
        operIsenta: 'N',
        calcIpi: 'N',
      },
    }));

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          createToken(login: "33517308293", senha: "123") {
            token
            refreshToken
            usuario {
              login
              perfil {
                nome_perfil
              }
              pessoa {
                nomeCompleto
                nomeFantasia
                tipoPessoa
                saldo {
                  saldo
                }
                pessoaCadastro {
                  ... on PessoaFisica {
                    cpf
                  }
                  ... on PessoaJuridica {
                    cnpj
                  }
                }
              }
            }
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.createToken).toBeNull();
  });

  it('Should return token when credentials user PJ is correct', async () => {
    const dbMocks = {
      Usuario: {
        model: {
          id_usuario: 1,
          nome_usuario: 'EUCATTUR',
          login: '13484296000105',
          email: 'teste@teste.com',
          senha: hashSync('123'),
          status_usuario: 'A',
          perfis: [{ nome_perfil: 'Teste' }],
        },
        options: {
          instanceMethods: UsuarioMethods,
        },
      },
    };
    const { server, pessoaApi, geralApi } = constructTestServer({ authorization: true, dbMocks });

    // @ts-ignore
    pessoaApi.get = jest.fn(() => ({
      id: 96809,
      nomeCompleto: 'INTEGRACAO TRANSPORTES LTDA',
      nomeFantasia: 'EUCATTUR',
      tipoPessoa: 'PJ',
      pessoaJuridica: {
        cnpj: '13484296000105',
        id: '33006',
        inscricaoMunicipal: ' ',
        cgf: ' ',
      },
    }));
    // @ts-ignore
    geralApi.get = jest.fn(() => [
      {
        limite: 0,
        em_aberto: 0,
        saldo: 0,
        aviso: null,
        permissao: null,
        bloqueado: '',
      },
    ]);

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          createToken(login: "13484296000105", senha: "123") {
            token
            refreshToken
            usuario {
              login
              perfil {
                nome_perfil
              }
              pessoa {
                nomeCompleto
                nomeFantasia
                tipoPessoa
                saldo {
                  saldo
                }
                pessoaCadastro {
                  ... on PessoaFisica {
                    cpf
                  }
                  ... on PessoaJuridica {
                    cnpj
                  }
                }
              }
            }
          }
        }
      `,
    });
    // @ts-ignore
    expect(res.data.createToken).toHaveProperty('token');
    // @ts-ignore
    expect(res.data.createToken.usuario.pessoa.tipoPessoa).toBe('PJ');
  });
});
