import { aplicacoesMutations, aplicacoesQueries, aplicacoesTypes } from './aplicacoes.schema';
import {
  autocompleteMutations,
  autocompleteQueries,
  autocompleteTypes,
} from './autocomplete.schema';
import { produtoMutations, produtoQueries, produtoTypes } from './catalogo.schema';
import { clienteMutations, clienteQueries, clienteType } from './cliente.schema';
import { geralQueries, geralTypes } from './geral.schema';
import { imagemMutations, imagemQueries, imagemTypes } from './imagem.schema';
import { precoMutations, precoQueries, precoTypes } from './preco.schema';
import { similarMutations, similarQueries, similarTypes } from './similar.schema';
import { tokenMutations, tokenTypes } from './token.schema';
import { usuarioMutations, usuarioQueries, usuarioTypes } from './usuario.schema';
import { pessoaMutations, pessoaTypes, pessoaQueries } from './pessoa.schema';

const mutations = [
  aplicacoesMutations,
  autocompleteMutations,
  produtoMutations,
  clienteMutations,
  imagemMutations,
  precoMutations,
  similarMutations,
  tokenMutations,
  usuarioMutations,
  pessoaMutations,
];

const types = [
  aplicacoesTypes,
  autocompleteTypes,
  produtoTypes,
  clienteType,
  geralTypes,
  imagemTypes,
  precoTypes,
  similarTypes,
  tokenTypes,
  usuarioTypes,
  pessoaTypes,
];

const queries = [
  aplicacoesQueries,
  autocompleteQueries,
  produtoQueries,
  clienteQueries,
  geralQueries,
  imagemQueries,
  precoQueries,
  similarQueries,
  usuarioQueries,
  pessoaQueries,
];

export { mutations, types, queries };
