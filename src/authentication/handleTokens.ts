import jwt from 'jsonwebtoken';
import {JWT_TOKEN_REFRESH_SECRET, JWT_TOKEN_SECRET} from "../utils/utils";
import JWT_SETTINGS from '../environment/jwt'

/* istanbul ignore next */
const verifyToken = async (token, secret, addSecurityChecks = {}) => new Promise(resolve =>
    jwt.verify(token, secret, {...addSecurityChecks}, (err: any, decoded: any) => {
        if (err) {
            resolve({
                ok: false
            });
        } else {
            resolve({
                ok: true,
                token,
                id: decoded.sub
            });
        }
    }));

/* istanbul ignore next */
const signToken = async (user, secret, expiration = 60 * 60, additionalClaims = {}) => new Promise(resolve =>
    jwt.sign(
        {sub: user},
        secret,
        {
            expiresIn: expiration,
            ...additionalClaims,
        }, (err, result) => {
            if (err) {
                resolve(undefined);
            } else {
                resolve(result);
            }
        },
    ));

export const createTokens = async (data, additionalClaims = {}) => {
    const {id, refreshTokenSecret = id + JWT_TOKEN_REFRESH_SECRET} = data;

    const createToken = await signToken(id, JWT_TOKEN_SECRET, JWT_SETTINGS.HEADER.TOKEN.EXP, additionalClaims);
    const createRefreshToken = await signToken(id, refreshTokenSecret, JWT_SETTINGS.HEADER.REFRESH_TOKEN.EXP, additionalClaims);

    return [createToken, createRefreshToken];
};

export const refreshTokens = async (refreshToken) => {
    const addSecurityChecks = {};

    let userId = 0;
    try {
        const {sub}: any = jwt.decode(refreshToken);
        userId = sub;
    } catch (err) {
        return {};
    }

    if (!userId) {
        return {};
    }

    const refreshTokenSecret = userId + JWT_TOKEN_REFRESH_SECRET;
    const {ok, id}: any = await verifyToken(refreshToken, refreshTokenSecret, addSecurityChecks);

    if (ok) {
        const [newToken, newRefreshToken] = await createTokens({id, refreshTokenSecret}, addSecurityChecks);
        return {
            token: newToken,
            refreshToken: newRefreshToken,
            id
        };
    }
    /* istanbul ignore next */
    return {};
};
