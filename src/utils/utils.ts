import { ResolverContext } from '../interfaces/ResolverContextInterface';
import { ComposableResolver, GraphQLB2BResolver } from '../types/GraphqlTypes';

export const normalizePort = (val: number | string): number => {
  return typeof val === 'string' ? parseInt(val) : val;
};

export const handleError = (error: Error) => {
  const errorMessage: string = `${error.name}: ${error.message}`;
  return Promise.reject(new Error(errorMessage));
};

export const throwError = (condition: boolean, message: string): void => {
  if (condition) {
    throw new Error(message);
  }
};

/**
 * Função que recebe uma array de funções e 'reduz' a uma única função. As funções são executadas da última até a primeira em sequência, recebendo como argumento o resultado da função anterior.
 * @param funcs Array de funções que recebem tipo 'T' como argumento e retornam tipo 'T'
 */
export const compose = <T>(...funcs: Array<(arg: T) => T>): ((arg: T) => T) => (value: T) =>
  funcs.reduceRight((prev, fn) => fn(prev), value);

/**
 * Função para facilitar a tipagem do compose para resolver do graphql
 * @param funcs Array de funções do tipo ComposableResolver
 */
export const gqlCompose = (...funcs: ComposableResolver[]) => compose<GraphQLB2BResolver>(...funcs);

/**
 * Função que mapeia campos dinâmicos de um resolver
 * @param dynamicResolvers Objeto cuja chave é o caminho para o campo dinâmico. Ex.: 'getPessoa.produtos.preco'
 * @param args Argumentos passados para o graphql resolver
 * @param context Context passado para o graphql resolver
 * @param info Info passado para o graphql resolver
 * @param object Objeto a ser mapeado
 */
export const mapDynamicFields = async (
  dynamicResolvers,
  args,
  context: ResolverContext,
  info,
  object,
) => {
  let obj = object;
  for (const field in dynamicResolvers) {
    if (dynamicResolvers.hasOwnProperty(field)) {
      if (findGraphQLSelectionField(info.operation, field)) {
        obj = await dynamicResolvers[field](args, context, obj);
      }
    }
  }
  return obj;
};

/**
 * Função que percorre o objeto 'info' do graphql resolver a fim de verificar se o campo descrito em 'fieldPath' foi buscado. retorna true se sim, false se não
 * @param selection Selection atual do objeto 'info' do graphql resolver
 * @param fieldPath Caminho do campo a ser buscado
 */
function findGraphQLSelectionField(selection, fieldPath: string) {
  const fieldList = fieldPath.split('.');
  const fieldsOr = fieldList[0].split('|');
  const field = selection['selectionSet']['selections'].find(selection =>
    fieldsOr.some(option => selection['name']['value'] === option),
  );
  if (field != null) {
    if (fieldList.length > 1) {
      fieldList.shift();
      // @ts-ignore
      return findGraphQLSelectionField(field, fieldList.join('.'));
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export const JWT_TOKEN_SECRET: string = 'pmz_t';
export const JWT_TOKEN_REFRESH_SECRET: string = 'pmz_tr';
