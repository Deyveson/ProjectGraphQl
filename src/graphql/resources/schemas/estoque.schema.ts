const estoqueType = `
type Estoque{
  filial: Int
  produto: String
  qtd: Int
  qtdInventario: Int
  minimo: Int
  maximo: Int
  ativo: String
  endereco: String
}

input BuscaEstoque{
  uf: String!
  produto: String!
  empresa: Int!
  fornecedor: Int!
}

`;

const estoqueQueries = `
  getEstoque(buscaEstoque: BuscaEstoque!): [Estoque]!
`;

const estoqueMutations = `
`;

export { estoqueType, estoqueQueries, estoqueMutations };
