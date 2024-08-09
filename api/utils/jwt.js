import jwt from 'jsonwebtoken';

const issuer = 'Ostarbiters';
const audience = 'qwqwqwq';
const { JWT_SECRET } = process.env
export default {
    generate(payload = {}, options = {}) {
        if (!payload.iat) payload.iat = Math.round(+new Date() / 1000);

        return {

            jwt: jwt.sign(payload, JWT_SECRET, { issuer, audience, ...options }),
            iat: payload.iat,
        };
    },
    // Проверка ключа и возвращение декодированного payload
    verify(key) {
        return jwt.verify(key, JWT_SECRET, { issuer, audience });
    },

    // декодирование токена
    decode(token) {
        return jwt.decode(token);
    },
};
