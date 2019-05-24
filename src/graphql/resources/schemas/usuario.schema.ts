const usuarioTypes = `
# User definition type
type Usuario {
  email: String
  login: String

  pessoa: Pessoa!
  perfil: Perfil!
}

type Credencial {
  token: String!
  refreshToken: String!
  usuario: Usuario
}

type Perfil{
  nome_perfil: String
}
`;

const usuarioQueries = `
  getUsuarios: [Usuario!]
  getPerfilUsuario: Perfil
  checkAuth: Boolean
`;

const usuarioMutations = `
  createToken(login: String!, senha: String!): Credencial
`;

export { usuarioTypes, usuarioQueries, usuarioMutations };
