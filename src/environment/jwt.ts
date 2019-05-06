// @ts-ignore
import APP from './../config/app.json';
// @ts-ignore
import JWT_SETTINGS from './../config/jwt.json';

/* istanbul ignore next */
const {
    TOKEN_EXP = 6 * 60, // 6 minutes (seconds)
    REFRESH_TOKEN_EXP = 7 * 24 * 60 * 60, // 7 days (seconds)
} = JWT_SETTINGS;


/* istanbul ignore next */
const {
    NAMESPACE = '_',
    PREFIX = '-x',
    TOKEN_SUFFIX = '-token',
    REFRESH_TOKEN_SUFFIX = '-refresh-token',
} = APP;

const TOKEN_NAME = `${PREFIX}${NAMESPACE}${TOKEN_SUFFIX}`;
const REFRESH_TOKEN_NAME = `${PREFIX}${NAMESPACE}${REFRESH_TOKEN_SUFFIX}`;

export default {
    HEADER: {
        TOKEN: {
            NAME: TOKEN_NAME,
            EXP: TOKEN_EXP,
        },
        REFRESH_TOKEN: {
            NAME: REFRESH_TOKEN_NAME,
            EXP: REFRESH_TOKEN_EXP,
        },
    }
};
