const aplicacoesTypes = `
type Aplicacoes{
    aplicacao: String!
    inicio: String!
    fim: String!
    original: String!
}

input BuscaAplicacoes {
    empresa: Int!,
    fornecedor: Int!,
    produto: String!
}
`;
const aplicacoesQueries = `
    getAplicacoes(buscaAplicacoes: BuscaAplicacoes!): [Aplicacoes]!
`;

const aplicacoesMutations = `
`;

export { aplicacoesTypes, aplicacoesQueries, aplicacoesMutations };
