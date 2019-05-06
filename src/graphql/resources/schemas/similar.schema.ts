const similarTypes = `
type ProdutoSimilar {
    id:  ID!,
    idEmpresa: Int!,
    idFornecedor: Int!,
    nomeFornecedor: String!,
    codigoProduto: String!,
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
    models: [ModelsSimilar!]!
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
}

type ModelsSimilar{
    nomeCarro: String!
    modelTipos: [ModelTiposSimilar]
}

type ModelTiposSimilar{
    tipoNome: String
    geracao: String
    motor: String
    anos: [String]
    nomeMotor: String
    modeloTransmissao: String
    eixoMotriz: String
}

input BuscaSimilar {
    filial: Int!
    empresa: Int!
    fornecedor: Int!
    produto: String!
}
`;
const similarQueries = `
    getSimilar(buscaSimilar: BuscaSimilar!): [ProdutoSimilar]!
`;

const similarMutations = `
`;

export { similarTypes, similarQueries, similarMutations };
