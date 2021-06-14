const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = {

    async auth(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ error: 'No token provided' });
        };

        // Formato do token: Bearer vh38dirle9d0ple763jduclkfue33
        const parts = authHeader.split(' ');

        if (!parts.length === 2) {
            return res.status(401).send({ error: 'Token error' });
        };

        const [scheme, token] = parts;

        if (!/Bearer$/i.test(scheme)) {
            return res.status(401).send({ error: 'Token badformatted' })
        }

        jwt.verify(token, authConfig.secret, (err, decode) => {
            if (err) {
                return res.status(401).send({ error: 'Token invalid' });
            }

            req.userId = decode.id; // ou  decoded.params.id

            return next();

            // return res.status(200).send({ sucess: "OK" })

        });
    }
};