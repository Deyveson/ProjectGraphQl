const produtoTypes = `
type ProdutosPage{
    produtos: [Produto]!
    tags: [String]!
    numeroElementos: Int!
    numeroPagina: Int!
    totalElementos: Int!
    totalPaginas: Int!
}

type Produto{
  id:  ID!
  idEmpresa: Int!
  idFornecedor: Int!
  nomeFornecedor: String!
  codigoProduto: String!
  codigoOriginalProduto: Int
  nomeProduto: String!
  frequencia: Int!
  codProduto: String!
  score: Int
  tags: String
  carType: String
  carId: Int
  articleNo: Int
  manuId: Int
  models: [Models!]!
  modeloCarro: String
  fabricante: String
  anos: [String]
  eixo: [String]
  posicao: [String]
  lado: [String]
  motor: [String]
  combustivel: [String]
  aplicacao: [String]
  montadoras: [String]
  prefixo: String
  aro: String
  perfil: String
  viscosidade: String
  amperagem: String
  unidade: PrecoProduto
  caixa: PrecoProduto
  imagem: String
  estoque: EstoqueProduto
}

type PrecoProduto {
  preco: Float!
  qtd: String!
}

type EstoqueProduto {
  qtd: Int!
  qtdInventario: Int!
  qtdDisponivel: Int!
}

type Models{
    nomeCarro: String!
    modelTipos: [ModelTipos]
}

type ModelTipos{
    tipoNome: String
    geracao: String
    motor: String
    anos: [String]
    nomeMotor: String
    modeloTransmissao: String
    eixoMotriz: String
}

input PesqProduto{
    page: Int!
    count: Int!
    order: String!
    sort: String!
    nomeProduto: String!
    cpfCnpj: String
}

input PesqSimilar {
  filial: Int!
  empresa: Int!
  fornecedor: Int!
  produto: String!
  cpfCnpj: String
}
`;

const produtoQueries = `
    getProdutos(pesqProduto: PesqProduto!): ProdutosPage!
    getSimilares(pesqSimilar: PesqSimilar): [Produto]!
`;

const produtoMutations = `
`;

export { produtoTypes, produtoQueries, produtoMutations };
