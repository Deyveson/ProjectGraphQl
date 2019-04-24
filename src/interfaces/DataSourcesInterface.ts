import { CatalogoAPI } from '../graphql/datasource'
import { PrecoAPI } from '../graphql/datasource'
import ClienteAPI from '../graphql/resources/catalogo/clienteDataSouce'

export interface DataSources {
  catalogoApi: CatalogoAPI
  precoApi: PrecoAPI
  clienteApi: ClienteAPI
}
