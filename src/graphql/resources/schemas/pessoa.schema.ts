const pessoaTypes = `
type Pessoa{
  id: ID!
  nomeCompleto: String
  nomeFantasia: String
  tipoPessoa: String
  dataCadastro: String
  tipoCadastro: Int
  emails: [Emails]
  enderecos: [Enderecos]
  telefones: [Telefones]
  pessoaCadastro: PessoaCadastro
  clientes: Clientes
}

type Email {
  id: Int
  descricao: String
  finalidade: Int
  contato: String
}

type Enderecos {
  id: Int
  inscricaoEstadual: InscricaoEstadual
  codPais: Int
  infobusca: Int
  logradouro: String
  codUf: Int
  codMunicipio: Int
  cep: String
  bairro: String
  numero: String
  contato: String
  complemento: String
  tipo: Int
  validInfoBusca: Boolean
  validTipoEndereco: Boolean
  numeroNulo: Boolean
  validTipoFiscal: Boolean
}

type Telefones {
  id: Int
  numero: Int
  ddd: Int
  tipo: Int
  contato: String
}

interface PessoaCadastro {
  id: ID!
  inscricaoMunicipal: String
  cgf: String
  calcIpi: String
}

type PessoaJuridica implements PessoaCadastro {
  id: ID!
  inscricaoMunicipal: String
  cgf: String
  calcIpi: String
  cnpj: String
}

type PessoaFisica implements PessoaCadastro {
  id: ID!
  cpf: String
  numeroRg: String
  emissaoRg: String
  emissorRg: String
  cgf: String
  inscricaoMunicipal: String
  operIsenta: String
  calcIpi: String
}

type Clientes {
  id: Int
  bloqueio: String
  agruparNotas: String
  cobrador: String
  tipoPreco: String
  cartaFianca: String
  valorCarta: Int
  prazoMedio: Int
  conceito: String
  exignfdv: String
  observacao: String
  limiteCredito: Int
  tpEmpresa: String
  qtdElevador: Int
  qtdMecanico: Int
  qtdVeiculos: Int
  qtdVendedor: Int
  linhaLeve: String
  linhaPesada: String
  linhaMedia: String
  linhaOutras: String
  metragemAuto: Int
  metragemOfic: Int
  percentualAumento: Int
}

type InscricaoEstadual{
  id: Int
  inscricao: String
  contribuinte: String
  validContribuinte: Boolean
}

type Emails {
  id: Int
  descricao: String
  finalidade: Int
  contato: String
}
`;

const pessoaQueries = `
  getPessoa(text: String!): Pessoa!
`;

const pessoaMutations = `
`;

export { pessoaTypes, pessoaQueries, pessoaMutations };
