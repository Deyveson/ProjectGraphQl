const imagemTypes = `
type Imagem{
    CodFornecedor: String!,
    CodProduto: String!,
    ImgBase64: String!,
}

input BuscaImagem{
    CodFornecedor: String!
    CodProduto: String!
}
`;

const imagemQueries = `
    getImagem(buscaImagem: [BuscaImagem]!): [Imagem]!
`;

const imagemMutations = `
`;
export { imagemTypes, imagemQueries, imagemMutations };
