import { pessoaResolvers } from './pessoa.resolvers';
import { catalogoResolvers } from './catalogo.resolvers';
import { geralResolvers } from './geral.resolvers';
import { imagemResolvers } from './imagem.resolvers';
import { precoResolvers } from './preco.resolvers';
import { tokenResolvers } from './token.resolvers';
import { usuarioResolvers } from './usuario.resolvers';

export default [
  catalogoResolvers,
  geralResolvers,
  imagemResolvers,
  precoResolvers,
  tokenResolvers,
  usuarioResolvers,
  pessoaResolvers,
];
