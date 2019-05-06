import { authResolvers } from '../../composable/auth.resolver';
import { handleError, gqlCompose, mapDynamicFields } from '../../../utils/utils';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';

const camposDinamicos = {
  'getProdutos.produtos.preco': async (args, { dataSources }: ResolverContext, produtosPage) => {
    const consumidor = await dataSources.pessoaApi.searchPessoa(args.text);

    const buscaProduto = produtosPage.produtos.map(produto => ({
      condicao: 'XXXXXXX',
      descontoItem: 0,
      fatorAumento: consumidor.clientes.percentualAumento,
      filial: 34,
      fornecedorCodigo: produto.idFornecedor,
      fornecedorEmpresa: produto.idEmpresa,
      produto: produto.codigoProduto,
      tipoPreco: consumidor.clientes.tipoPreco,
      unidadeVenda: 'UN',
    }));

    const produtosPreco = await dataSources.precoApi.buscaListaProdutosEstoquePreco(buscaProduto);

    const produtosComPreco = produtosPage.produtos.map(produto => {
      const produtoEncontrado = produtosPreco.find(
        produtoPreco =>
          produtoPreco.fornecedorCodigo.toString() === produto.idFornecedor &&
          produtoPreco.empresa.toString() === produto.idEmpresa &&
          produtoPreco.produto === produto.codigoProduto,
      );
      const preco =
        produtoEncontrado != null
          ? {
              valor: produtoEncontrado.unidade[0].preco,
              unidadeVenda: produtoEncontrado.unidade[0].tipo,
            }
          : null;
      return { ...produto, preco };
    });
    return { produtos: produtosComPreco, tags: produtosPage.tags };
  },
  'getProdutos.produtos.imagem': async (args, { dataSources }: ResolverContext, produtosPage) => {
    const buscaImagem = produtosPage.produtos.map(produto => ({
      CodFornecedor: produto.idFornecedor,
      CodProduto: produto.codigoProduto,
    }));
    const imagens = await dataSources.imagemApi.searchImagem(buscaImagem);

    const produtosComImagem = produtosPage.produtos.map(produto => {
      const produtoEncontrado = imagens.find(
        imgProduto =>
          imgProduto.CodFornecedor === produto.idFornecedor &&
          imgProduto.CodProduto === produto.codigoProduto,
      );
      const img = produtoEncontrado != null ? produtoEncontrado['ImgBase64'] : '';
      return { ...produto, imagem: img };
    });

    return { ...produtosPage, produtos: produtosComImagem };
  },
};

export const catalogoResolvers = {
  Query: {
    getProdutos: gqlCompose(...authResolvers)(
      async (parent, { pesqProduto }, context: ResolverContext, info) => {
        const produtosPage = await context.dataSources.catalogoApi
          .searchProduto(pesqProduto)
          .catch(handleError);

        const newProdutosPage = await mapDynamicFields(
          camposDinamicos,
          { pesqProduto },
          context,
          info,
          produtosPage,
        );

        return newProdutosPage;
      },
    ),
    getAplicacoes: gqlCompose(...authResolvers)(
      async (parent, { buscaAplicacoes }, { dataSources }: ResolverContext, info) => {
        return dataSources.catalogoApi.searchAplicacoes(buscaAplicacoes).catch(handleError);
      },
    ),
    getSimilar: gqlCompose(...authResolvers)(
      async (parent, { buscaSimilar }, { dataSources }: ResolverContext, info) => {
        return dataSources.catalogoApi.searchSimilar(buscaSimilar).catch(handleError);
      },
    ),
    getcliente: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const cliente = Object.assign({ args });
        return dataSources.catalogoApi.searchCliente(cliente).catch(handleError);
      },
    ),
    getAutocomplete: gqlCompose(...authResolvers)(
      async (parent, args, { dataSources }: ResolverContext) => {
        const autocomplete = Object.assign({ args });
        return dataSources.catalogoApi.searchAutocomplete(autocomplete).catch(handleError);
      },
    ),
  },
};
