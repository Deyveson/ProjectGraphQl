const geralTypes = `
    type SaldoCliente {
    limite: Int!,
    em_aberto: Int!,
    saldo: Int!,
    aviso: String,
    permissao: String,
    bloqueado: String
    }
`;

const geralQueries = `
    getSaldoCliente(cpfCnpj: String!): SaldoCliente!
`;

export { geralTypes, geralQueries };
