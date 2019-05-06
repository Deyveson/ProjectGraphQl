import { mutations } from './resources/schemas';

const Mutation = `
    type Mutation {
        ${mutations.join(',')}
    }
`;

export { Mutation };
