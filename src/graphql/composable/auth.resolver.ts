import { GraphQLFieldResolver } from 'graphql';

import { ResolverContext } from '../../interfaces/ResolverContextInterface';
import { verifyTokenResolver } from './verify-token.resolver';
import { UNAUTHORIZED } from '../../environment';

export const authResolver = (
  resolver: GraphQLFieldResolver<any, ResolverContext>,
): GraphQLFieldResolver<any, ResolverContext> => {
  return (parent, args, context: ResolverContext, info) => {
    if (context.authUser || context.authorization) {
      return resolver(parent, args, context, info);
    }
    throw new Error(UNAUTHORIZED);
  };
};

export const authResolvers = [authResolver, verifyTokenResolver];
