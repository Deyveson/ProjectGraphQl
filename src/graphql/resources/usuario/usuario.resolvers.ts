import { handleError, gqlCompose } from "../../../utils/utils";
import { authResolvers } from "../../composable/auth.resolver";

export const usuarioResolvers = {
    Query: {
        getUsuarios: gqlCompose(...authResolvers)((parent: any, args: any, context: any) => {
            return context.db.Usuario
                .findAll({
                    attributes: ['id_usuario', 'nome_usuario', 'login']
                }).catch(handleError);
        })
    }
};