import { PessoaService } from '../../src/services';

describe('Test getPessoaFisicaByCPF', () => {
  describe('Test getPessoaFisicaByCPF', () => {
    it('Should return response false when CNPJ is not valid', async () => {
      const resp = await PessoaService.getPessoaFisicaByCPF('1234567891');
      expect(resp.success).toBe(false);

      const resp2 = await PessoaService.getPessoaFisicaByCPF('aaaaaaaaaaaaaaaa');
      expect(resp2.success).toBe(false);
    });

    it('Should return response false when pessoa does not exist', async () => {
      const resp = await PessoaService.getPessoaFisicaByCPF('12345678910');
      expect(resp.success).toBe(false);
    });
  });

  describe('Test getPessoaJuridicaByCNPJ', () => {
    it('Should return response false when CNPJ is not valid', async () => {
      const resp = await PessoaService.getPessoaJuridicaByCNPJ('1234567891');
      expect(resp.success).toBe(false);

      const resp2 = await PessoaService.getPessoaJuridicaByCNPJ('aaaaaaaaaaaaaaaa');
      expect(resp2.success).toBe(false);
    });

    it('Should return response false when pessoa does not exist', async () => {
      const resp = await PessoaService.getPessoaJuridicaByCNPJ('12345678910234');
      expect(resp.success).toBe(false);
    });
  });
});
