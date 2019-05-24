import { aplicacoesMutations, aplicacoesQueries, aplicacoesTypes } from './aplicacoes.schema';
import {
  autocompleteMutations,
  autocompleteQueries,
  autocompleteTypes,
} from './autocomplete.schema';
import { produtoMutations, produtoQueries, produtoTypes } from './catalogo.schema';
import { clienteMutations, clienteQueries, clienteType } from './cliente.schema';
import { condicaoMutations, condicaoQueries, condicaoType } from './codicaoPagamento.schema';
import { estoqueMutations, estoqueQueries, estoqueType } from './estoque.schema';
import { pedidoMutations, pedidoQueries, pedidoType } from './pedido.schema';
import { pessoaMutations, pessoaQueries, pessoaTypes } from './pessoa.schema';
import { usuarioMutations, usuarioQueries, usuarioTypes } from './usuario.schema';

const mutations = [
  aplicacoesMutations,
  autocompleteMutations,
  produtoMutations,
  clienteMutations,
  usuarioMutations,
  pessoaMutations,
  estoqueMutations,
  condicaoMutations,
  pedidoMutations,
];

const types = [
  aplicacoesTypes,
  autocompleteTypes,
  produtoTypes,
  clienteType,
  usuarioTypes,
  pessoaTypes,
  estoqueType,
  condicaoType,
  pedidoType,
];

const queries = [
  aplicacoesQueries,
  autocompleteQueries,
  produtoQueries,
  clienteQueries,
  usuarioQueries,
  pessoaQueries,
  estoqueQueries,
  condicaoQueries,
  pedidoQueries,
];

export { mutations, types, queries };
