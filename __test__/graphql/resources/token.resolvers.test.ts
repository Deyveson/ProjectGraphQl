import { tokenResolvers } from '../../../src/graphql/resources/token/token.resolvers';
import SequelizeMock from 'sequelize-mock';

describe('Test token resolvers', () => {
    const dbMock = new SequelizeMock();
    const defaultUser = {
        id_usuario: 1,
        nome_usuario: 'thalyson',
        login: 'thalyson',
        email: 'teste@teste.com',
        senha: '123456',
        perfis: [{ nome_perfil: 'Teste' }]
    };
    const UserMock = dbMock.define('Usuario', defaultUser, {
        instanceMethods: {
            isPassword: () => true
        }
    });
    UserMock.$queryInterface.$useHandler((query, queryOptions, done) => {
        if (query === 'findOne') {
            return queryOptions[0].where.login === 'thalyson' ? UserMock.build(defaultUser) : null;
        }
        return null;
    });

    it('Should throw when no user found', async () => {

        // @ts-ignore
        await expect(tokenResolvers.Mutation.createToken(null, { login: 'login', senha: 'senha' }, { db: { Usuario: UserMock } })).rejects.toBeDefined();
    });

    it('Should return token when user is correct', async () => {
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: 'thalyson', senha: 'senha' }, { db: { Usuario: UserMock } });
        expect(user).toHaveProperty('token');
    });

    it('Should return empty perfil if perfil is null', async () => {
        const UserMock2 = dbMock.define('Usuario', { ...defaultUser, perfis: [] }, {
            instanceMethods: {
                isPassword: () => true
            }
        });
        // @ts-ignore
        const user = await tokenResolvers.Mutation.createToken(null, { login: 'thalyson', senha: 'senha' }, { db: { Usuario: UserMock2 } });
        expect(user.usuario.perfil.nome_perfil).toBe('');
    });
});