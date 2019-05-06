import { RESTDataSource } from 'apollo-datasource-rest';

class ImagemApi extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.85:5555/';
  }

  public async searchImagem(buscaImagem) {
    const imagem = await this.post('imageGroup', buscaImagem);
    return imagem;
  }
}

export default ImagemApi;
