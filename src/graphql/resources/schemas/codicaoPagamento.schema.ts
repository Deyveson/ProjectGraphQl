const condicaoType = `
type CondicaoPagamento {
    recnum: Int
    codigo: String
    nomeCondicaoPagamento: String
    descricao: String
    parcelas: Int
    periodo: Int
    periodoEntrada: Int
    descontoMedio: Float
    documento: String
}
`;

const condicaoQueries = `
  getCondicao(cpfCnpj: String): [CondicaoPagamento]!
`;

const condicaoMutations = `
`;

export { condicaoType, condicaoQueries, condicaoMutations };
