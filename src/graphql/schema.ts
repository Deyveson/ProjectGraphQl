import { merge } from 'lodash';
import { Mutation } from './mutation';
import { Query } from './query';
import resolversModule from './resources/resolvers';
import { types } from './resources/schemas';

const resolvers = merge(resolversModule);

const typeDefs = [Query, Mutation, ...types];

export { resolvers, typeDefs };
