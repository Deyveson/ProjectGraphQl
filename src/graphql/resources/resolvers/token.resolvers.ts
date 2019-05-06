import { ERROR } from '../../../environment';
import { createTokens } from '../../../authentication/handleTokens';
import { ResolverContext } from '../../../interfaces/ResolverContextInterface';
import { PessoaService } from '../../../services';

export const tokenResolvers = {
  Mutation: {
    createToken: async (parent: any, { login, senha }: any, { db }: ResolverContext) => {
      if (!login || !senha) {
        throw new Error(ERROR.USER.EMPTY_CREDENTIALS);
      }

      const cpfCnpj = login.toString().replace(/[^0-9]+/g, '');
      let pessoa: any = {};

      if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
        throw new Error(ERROR.USER.WRONG_CREDENTIALS);
      }

      if (cpfCnpj.length === 11) {
        await PessoaService.getPessoaFisicaByCPF(cpfCnpj).then(resp => {
          if (!resp.success) {
            throw new Error(ERROR.USER.DOES_NOT_EXIST);
          }

          pessoa = resp.data;
        });
      } else if (cpfCnpj.length === 14) {
        await PessoaService.getPessoaJuridicaByCNPJ(cpfCnpj).then(resp => {
          if (!resp.success) {
            throw new Error(ERROR.USER.DOES_NOT_EXIST);
          }
          pessoa = resp.data;
        });
      }

      return db.Usuario.findOne({
        where: { login: cpfCnpj, cod_pessoa: pessoa.codpessoa },
        attributes: ['id_usuario', 'senha', 'cod_pessoa', 'login', 'email'],
        include: [
          {
            model: db.Perfil,
            through: {
              attributes: ['nome_perfil'],
            },
            as: 'perfis',
          },
        ],
      }).then(async usuario => {
        if (!usuario || !usuario.isPassword(usuario.get('senha'), senha)) {
          throw new Error(ERROR.USER.WRONG_CREDENTIALS);
        }

        const usuarioId = usuario.get('id_usuario');

        const [newToken, newRefreshToken] = await createTokens({ id: usuarioId });

        return {
          token: newToken,
          refreshToken: newRefreshToken,
          usuario: {
            login: usuario.login,
            email: usuario.email,
            nome_completo: pessoa.nome_completo,
            nome_fantasia: pessoa.nome_fantasia,
            tipo_pessoa: pessoa.tipo_pessoa,
            cpf: pessoa.cpf || '',
            cnpj: pessoa.cnpj || '',
            perfil: {
              nome_perfil: usuario.perfis[0] != null ? usuario.perfis[0].nome_perfil : '',
            },
          },
        };
      });
    },
  },
};
