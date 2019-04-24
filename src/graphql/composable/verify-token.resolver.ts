import * as jwt from 'jsonwebtoken';
import { GraphQLFieldResolver } from "graphql";

import { ResolverContext } from "../../interfaces/ResolverContextInterface";
import { JWT_SECRET } from '../../utils/utils';

export const verifyTokenResolver =
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {

        return (parent, args, context: ResolverContext, info) => {


            if (context.authorization) {
                const token: string = context.authorization.split(' ')[1];
                return jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
                    if (!err) {
                        return resolver(parent, args, context, info);
                    }
                    throw new Error(`${err.name}: ${err.message}`);
                });
            }

            throw new Error(`Unauthorized! Token not provided!`);
        };
    };