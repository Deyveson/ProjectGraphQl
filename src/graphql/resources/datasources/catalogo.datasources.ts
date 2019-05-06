import { RESTDataSource } from 'apollo-datasource-rest';

class CatalogoAPI extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-catalogo/api/';
  }

  public async searchProduto(pesqProduto) {
    const response = await this.get('produto', pesqProduto);
    const produtosPage = {
      produtos: response.produtos.content,
      tags: response.tags,
    };
    return produtosPage;
  }

  public async searchAplicacoes(buscaAplicacoes) {
    const aplicacoes = await this.get('produto/aplicacoes', buscaAplicacoes);
    return aplicacoes;
  }

  public async searchSimilar(buscaSimilar) {
    const similar = await this.get('produto/similar', buscaSimilar);
    return similar;
  }

  public async searchCliente(text) {
    const params = text.args.text;
    const response = await this.get('cliente' + '?text=' + params);
    return response.clientes.content;
  }

  public async searchAutocomplete(text) {
    const request = text.args.text;
    const autocomplete = await this.get('produto/autocomplete?text=' + request);
    return autocomplete;
  }
}

export default CatalogoAPI;
