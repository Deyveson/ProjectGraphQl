const usuarioTypes = `
    # User definition type
    type Usuario {
        id_usuario: ID!
        nome_usuario: String!
        login: String!
        email: String!
        senha: String!
        
        perfil: Perfil!
    }
    
    type Perfil{
        nome_perfil: String!
    }    
`;

const usuarioQueries = `
    getUsuarios: [Usuario!]
    getPerfilUsuario: Perfil
`;

const usuarioMutations = `
`;

export {
    usuarioTypes,
    usuarioQueries,
    usuarioMutations
}