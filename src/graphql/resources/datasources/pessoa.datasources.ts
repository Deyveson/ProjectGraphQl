import { RESTDataSource } from 'apollo-datasource-rest';

class PessoaApi extends RESTDataSource {
  constructor(config) {
    super();
    this.baseURL = `${config.microServicesUrl}/ws-pessoa/api/`;
  }

  public async searchPessoa(text) {
    if (text) {
      if (text.length > 11) {
        return await this.searchPessoaJuridica(text);
      } else {
        return await this.searchPessoaFisica(text);
      }
    } else {
      return await this.buscaConsumidorFinal();
    }
  }

  private async buscaConsumidorFinal() {
    return await this.get('pessoa/buscaConsumidorFinal');
  }

  private async searchPessoaFisica(text) {
    const params = text;
    const response = await this.get('pessoa/cpf2/' + params);
    return this.pessoaReducerFisica(response);
  }

  private async searchPessoaJuridica(text) {
    const params = text;
    const response = await this.get('pessoa/cnpj/' + params);
    return this.pessoaReducerJuridica(response);
  }

  private pessoaReducerFisica(pessoa) {
    return {
      id: pessoa.id,
      nomeCompleto: pessoa.nomeCompleto,
      nomeFantasia: pessoa.nomeFantasia,
      tipoPessoa: pessoa.tipoPessoa,
      dataCadastro: pessoa.dataCadastro,
      tipoCadastro: pessoa.tipoCadastro,
      emails: pessoa.emails,
      enderecos: pessoa.enderecos,
      telefones: pessoa.telefones,
      pessoaCadastro: pessoa.pessoaFisica,
      clientes: pessoa.clientes,
    };
  }

  private pessoaReducerJuridica(pessoa) {
    return {
      id: pessoa.id,
      nomeCompleto: pessoa.nomeCompleto,
      nomeFantasia: pessoa.nomeFantasia,
      tipoPessoa: pessoa.tipoPessoa,
      dataCadastro: pessoa.dataCadastro,
      tipoCadastro: pessoa.tipoCadastro,
      emails: pessoa.emails,
      enderecos: pessoa.enderecos,
      telefones: pessoa.telefones,
      pessoaCadastro: pessoa.pessoaJuridica,
      clientes: pessoa.clientes,
    };
  }
}

export default PessoaApi;
