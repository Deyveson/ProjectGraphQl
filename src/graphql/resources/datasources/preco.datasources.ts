import { RESTDataSource } from 'apollo-datasource-rest';

class PrecoAPI extends RESTDataSource {
  constructor(config) {
    super();
    this.baseURL = `${config.microServicesUrl}/ws-preco/api/`;
  }

  public async buscaListaProdutosEstoquePreco(buscaProdutos) {
    const produtos = await this.post('preco/buscaListaProdutosEstoquePreco', buscaProdutos);
    return produtos;
  }
}

export default PrecoAPI;
