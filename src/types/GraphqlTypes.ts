import { GraphQLFieldResolver } from 'graphql';
import { ResolverContext } from '../interfaces/ResolverContextInterface';

export type ComposableResolver = (
  fn: GraphQLFieldResolver<any, ResolverContext>,
) => GraphQLFieldResolver<any, ResolverContext>;

export type GraphQLB2BResolver = GraphQLFieldResolver<any, ResolverContext>;
