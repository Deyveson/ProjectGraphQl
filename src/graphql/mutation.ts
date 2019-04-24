import { usuarioMutations } from './resources/usuario/usuario.schema';
import { tokenMutations } from "./resources/token/token.schema";
import { precoMutations } from './resources/preco/preco.schema';

const Mutation = `
    type Mutation {
        ${usuarioMutations},
        ${tokenMutations},
        ${precoMutations}
    }
`;

export {
    Mutation
}