import { ComposableResolver, GraphQLB2BResolver } from "../types/GraphqlTypes";

export const normalizePort = (val: number | string): number => {
    return (typeof val === 'string') ? parseInt(val) : val;
};

export const handleError = (error: Error) => {
    const errorMessage: string = `${error.name}: ${error.message}`;
    return Promise.reject(new Error(errorMessage));
};

export const throwError = (condition: boolean, message: string): void => {
    if (condition) { throw new Error(message); }
};

/**
 * Função que recebe uma array de funções e 'reduz' a uma única função. As funções são executadas da última até a primeira em sequência, recebendo como argumento o resultado da função anterior.
 * @param funcs Array de funções que recebem tipo 'T' como argumento e retornam tipo 'T'
 */
export const compose = <T>(...funcs: Array<(arg: T) => T>): ((arg: T) => T) => (value: T) => funcs.reduceRight((prev, fn) => fn(prev), value);

/**
 * Função para facilitar a tipagem do compose para resolver do graphql
 * @param funcs Array de funções do tipo ComposableResolver
 */
export const gqlCompose = (...funcs: ComposableResolver[]) => compose<GraphQLB2BResolver>(...funcs);

export const JWT_SECRET: string = 'pmz';