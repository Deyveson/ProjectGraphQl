const produtoTypes = `
type ProdutosPage{
    produtos: [Produto]!
    tags: [String]!
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
  preco: PrecoProduto
  imagem: String
}

type PrecoProduto {
  valor: Float!
  unidadeVenda: String!
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
`;

const produtoQueries = `
    getProdutos(pesqProduto: PesqProduto!): ProdutosPage!
`;

const produtoMutations = `
`;

export { produtoTypes, produtoQueries, produtoMutations };
