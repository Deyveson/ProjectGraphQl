import { RESTDataSource } from 'apollo-datasource-rest';

class ImagemApi extends RESTDataSource {
  constructor(config) {
    super();
    this.baseURL = `${config.imagemUrl}/`;
  }

  public async searchImagem(buscaImagem) {
    const imagem = await this.post('imageGroup', buscaImagem);
    return imagem;
  }
}

export default ImagemApi;
