import { ApolloServerBase, gql } from 'apollo-server-core';
import createTestClient from "./createTestClient";
import database from './../src/models';
import { resolvers, typeDefs as typeDefsSchema } from "../src/graphql/schema";

describe("Authentication", () => {
    const typeDefs = gql(`
        ${typeDefsSchema.toString()}
    `);

    const myTestServer = new ApolloServerBase({
        typeDefs,
        context: () => ({ db: database }),
        resolvers
    });

    afterAll(async (done) => {
        await database.sequelize.close();
    });

    it('shold return jwt token and perfil usuario when valid credentials', async () => {
        const query = gql`
            mutation{
                createToken(login: "mario", senha: "123"){
                    token,
                    usuario{
                        perfil{
                            nome_perfil
                        }
                    }
                }
            }
        `;
        const client = createTestClient(myTestServer);
        const clientRes = await client.mutate({ query });

        // @ts-ignore
        expect(clientRes.data).toHaveProperty("createToken.token");
        expect(clientRes.data).toHaveProperty("createToken.usuario.perfil");
        expect(clientRes.errors).toBeUndefined();
    });


    it('shold return null with errors token when invalid credentials', async () => {
        const query = gql`
            mutation{
                createToken(login: "mario", senha: "1234"){
                    token
                }
            }
        `;
        const client = createTestClient(myTestServer);
        const clientRes = await client.mutate({ query });

        // @ts-ignore
        expect(clientRes.data.createToken).toBeNull();
        expect(clientRes.errors).not.toBeUndefined();
    });
});