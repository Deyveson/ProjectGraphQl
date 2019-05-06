import { queries } from './resources/schemas';

const Query = `
    type Query {
        ${queries.join(',')}
    }
`;

export { Query };
