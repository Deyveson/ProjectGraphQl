const aplicacoesTypes = `
type Aplicacoes{
  listaDados: [ListaDados]!
  pagina: Int!
  totalPorPagina: Int!
  totalElements: Int!
}

type ListaDados{
  nomeCarro: String!
  modelTipos: [ModelTipos]
}

input BuscaAplicacoes {
  page: Int!,
  count: Int!,
  codProduto: String!
  aplicacao: String
}
`;
const aplicacoesQueries = `
    getAplicacoes(buscaAplicacoes: BuscaAplicacoes!): Aplicacoes!
`;

const aplicacoesMutations = `
`;

export { aplicacoesTypes, aplicacoesQueries, aplicacoesMutations };
