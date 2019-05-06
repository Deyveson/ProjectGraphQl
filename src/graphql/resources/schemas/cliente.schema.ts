const clienteType = `
type Cliente {
    id: ID!
    nome: String!
    municipio: String!
    cnpj: String
    cpf: String
    estado: String!
    bairro: String!
    endereco: String!
    cep: Int!
}
`;

const clienteQueries = `
    getcliente(text: String!): [Cliente!]!
`;

const clienteMutations = `
`;

export { clienteType, clienteQueries, clienteMutations };
