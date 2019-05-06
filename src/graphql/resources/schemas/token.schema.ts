const tokenTypes = `
    type Credencial {
        token: String!
        refreshToken: String!
        usuario: Usuario
    }
`;

const tokenMutations = `
    createToken(login: String!, senha: String!): Credencial
`;

export { tokenTypes, tokenMutations };
