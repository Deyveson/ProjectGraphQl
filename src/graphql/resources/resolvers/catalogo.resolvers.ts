import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { gqlCompose, handleError, mapDynamicFields } from '../../../utils/utils';
import { authResolvers } from '../../composable/auth.resolver';

const getProdutosDynamic = {
  'getProdutos.produtos.unidade|caixa': async (
    cpfCnpj,
    { dataSources }: ResolverContext,
    produtosPage,
  ) => {
    const consumidor = await dataSources.pessoaApi.searchPessoa(cpfCnpj);

    // TODO Tirar dados mockados
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
      let unidade = null;
      let caixa = null;
      if (produtoEncontrado != null) {
        unidade = produtoEncontrado.unidade.find(un => un.tipo === 'UN');
        caixa = produtoEncontrado.unidade.find(un => un.tipo === 'CX');
      }
      return { ...produto, unidade, caixa };
    });
    return { ...produtosPage, produtos: produtosComPreco };
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
  'getProdutos.produtos.estoque': async (
    cpfCnpj,
    { dataSources }: ResolverContext,
    produtosPage,
  ) => {
    const consumidor = await dataSources.pessoaApi.searchPessoa(cpfCnpj);
    const produtosComEstoque = await produtosPage.produtos.map(async produto => {
      const buscaEstoque = {
        uf: consumidor['enderecos']['codUf'] || 'AM',
        produto: produto.codigoProduto,
        empresa: produto.idEmpresa,
        fornecedor: produto.idFornecedor,
      };

      try {
        const estoque = await dataSources.geralApi.searchEstoque(buscaEstoque);
        const reducedEstoque = estoque.reduce(
          (soma, atual) => ({
            qtd: soma.qtd + Math.floor(atual.qtd),
            qtdInventario: soma.qtdInventario + Math.floor(atual.qtdInventario),
          }),
          { qtd: 0, qtdInventario: 0 },
        );
        return {
          ...produto,
          estoque: {
            ...reducedEstoque,
            qtdDisponivel: Math.min(reducedEstoque.qtd, reducedEstoque.qtdInventario),
          },
        };
      } catch (error) {
        return produto;
      }
    });
    return { ...produtosPage, produtos: produtosComEstoque };
  },
};

const getSimilaresDynamic = {
  'getSimilares.unidade|caixa': getProdutosDynamic['getProdutos.produtos.unidade|caixa'],
  'getSimilares.imagem': getProdutosDynamic['getProdutos.produtos.imagem'],
};

export const catalogoResolvers = {
  Query: {
    getProdutos: gqlCompose(...authResolvers)(
      async (parent, { pesqProduto }, context: ResolverContext, info) => {
        const produtosPage = await context.dataSources.catalogoApi
          .searchProduto(pesqProduto)
          .catch(handleError);

        const newProdutosPage = await mapDynamicFields(
          getProdutosDynamic,
          pesqProduto.cpfCnpj,
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
    getSimilares: gqlCompose(...authResolvers)(
      async (parent, { pesqSimilar }, context: ResolverContext, info) => {
        const similares = await context.dataSources.catalogoApi
          .searchSimilar(pesqSimilar)
          .catch(handleError);
        const { produtos } = await mapDynamicFields(
          getSimilaresDynamic,
          pesqSimilar.cpfCnpj,
          context,
          info,
          { produtos: similares },
        );
        return produtos;
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
    getEstoque: gqlCompose(...authResolvers)(
      async (parent, { buscaEstoque }, { dataSources }: ResolverContext, info) => {
        return dataSources.geralApi.searchEstoque(buscaEstoque).catch(handleError);
      },
    ),
  },
};
