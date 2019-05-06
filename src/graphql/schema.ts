import { merge } from 'lodash';
import { Query } from './query';
import { Mutation } from './mutation';
import resolversModule from './resources/resolvers';
import { types } from './resources/schemas';

const resolvers = merge(resolversModule);

const typeDefs = [Query, Mutation, ...types];

export { resolvers, typeDefs };
