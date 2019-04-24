import { RESTDataSource } from 'apollo-datasource-rest'
// import { preprocessDirectives } from 'tslint/lib/verify/parse'

class ClienteAPI extends RESTDataSource {
  constructor() {
    super()
    // @ts-ignore
    this.initialize({ context: {} })
    this.baseURL = 'http://192.168.151.89:8000/ws-catalogo/api/'
  }

  public async searchCliente(text) {
    const params = text.args.text
    const response = await this.get('cliente' + '?text=' + params)
    return Array.isArray(response.clientes.content)
      ? response.clientes.content.map(cliente => this.clienteReducer(cliente))
      : []
  }

  public clienteReducer(cliente) {
    return {
      id: cliente.id || 0,
      nome: cliente.nome,
      municipio: cliente.municipio,
      cnpj: cliente.cnpj,
      cpf: cliente.cpf,
      estado: cliente.estado,
      bairro: cliente.bairro,
      endereco: cliente.endereco,
      cep: cliente.cep,
    }
  }
}

export default ClienteAPI
