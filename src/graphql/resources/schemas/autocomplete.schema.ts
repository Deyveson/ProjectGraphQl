const autocompleteTypes = `
type Autocomplete{
    id: Int!
    descricao: String!
}
`;

const autocompleteQueries = `
    getAutocomplete(text: String!): [Autocomplete!]!
`;

const autocompleteMutations = `
`;

export { autocompleteTypes, autocompleteQueries, autocompleteMutations };
