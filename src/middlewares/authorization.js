const knex = require('../connections/databaseConnection');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    const token = authorization.replace('Bearer ', '').trim();

    try {
        const { id } = jwt.verify(token, process.env.JWT);

        const login = await knex('usuarios').where({ id }).first();

        if (!login) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...user } = login[0];

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json(error.message);
    };
};

module.exports = verifyLogin;