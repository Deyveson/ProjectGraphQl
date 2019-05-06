import { RESTDataSource } from 'apollo-datasource-rest';

class GeralAPI extends RESTDataSource {
  constructor() {
    super();
    // @ts-ignore
    this.initialize({ context: {} });
    this.baseURL = 'http://192.168.151.89:8000/ws-geral/api/';
  }

  public async findSaldoClienteByCpfCnpj(cpfCnpj: string) {
    const saldoCliente = await this.get('/clientePemaza/saldoCliente/cpfCnpj', { cpfCnpj });
    return saldoCliente[0];
  }
}

export default GeralAPI;
