import { RESTDataSource } from 'apollo-datasource-rest';

class PrecoAPI extends RESTDataSource {
    constructor() {
        super();
        // @ts-ignore
        this.initialize({ context: {} })
        this.baseURL = 'http://192.168.151.89:8000/ws-preco/api/';
    }

    public async buscaListaProdutosEstoquePreco(buscaProdutos) {
        const produtos = await this.post('preco/buscaListaProdutosEstoquePreco', buscaProdutos);
        return produtos;
    }

    public async buscaCondicaoPagamento(buscaCondicao) {
        const res = await this.get('preco/buscaCondicaoPagamento', buscaCondicao);
        return res.retorno;
    }
}

export default PrecoAPI;