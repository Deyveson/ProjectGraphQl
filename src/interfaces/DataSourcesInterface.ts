import * as dataSources from '../graphql/resources/datasources';

export interface DataSources {
  catalogoApi: dataSources.CatalogoAPI;
  precoApi: dataSources.PrecoAPI;
  geralApi: dataSources.GeralAPI;
  imagemApi: dataSources.ImagemAPI;
  pessoaApi: dataSources.PessoaApi;
}
