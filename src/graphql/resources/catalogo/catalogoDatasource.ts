import { RESTDataSource } from 'apollo-datasource-rest'
// import { preprocessDirectives } from 'tslint/lib/verify/parse'

class CatalogoAPI extends RESTDataSource {
  constructor() {
    super()
    // @ts-ignore
    this.initialize({ context: {} })
    this.baseURL = 'http://192.168.151.89:8000/ws-catalogo/api/'
  }

  public async searchProduto(text) {
    const nomeProduto = text.args.text

    const response = await this.get(
      'produto?page=0&count=10&order=DESC&sort=frequencia&nomeProduto=' +
        nomeProduto
    )

    return Array.isArray(response.produtos.content)
      ? response.produtos.content.map(produto => this.produtoReducer(produto))
      : []
  }

  public produtoReducer(produto) {
    return {
      id: produto.id || 0,
      idEmpresa: produto.idEmpresa,
      idFornecedor: produto.idFornecedor,
      nomeFornecedor: produto.nomeFornecedor,
      codigoProduto: produto.codigoProduto,
      codigoOriginalProduto: produto.codigoOriginalProduto,
      nomeProduto: produto.nomeProduto,
      frequencia: produto.frequencia,
      codProduto: produto.codProduto,
      score: produto.score,
      tags: produto.tags,
      carType: produto.carType,
      carId: produto.carId,
      articleNo: produto.articleNo,
      manuId: produto.manuId,
      models: produto.models,
      anos: produto.anos,
    }
  }
}

export default CatalogoAPI
