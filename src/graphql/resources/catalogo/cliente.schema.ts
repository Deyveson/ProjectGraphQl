const clienteType = `
type Cliente {
    id: ID!
    nome: String!
    municipio: String!
    cnpj: Int!
    cpf: Int!
    estado: String!
    bairro: String!
    endereco: String!
    cep: Int!
}
`

const clienteQueries = `
    getcliente(text: String!): [Cliente!]!
`

const clienteMutations = `
`

export { clienteType, clienteQueries, clienteMutations }
