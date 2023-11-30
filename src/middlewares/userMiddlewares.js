const knex = require('../connections/databaseConnection');

const alredyExist = async (req, res, next) => {
    const { email } = req.body;
    try {
        const encontrarUsuario = await knex('usuarios').where({ email }).first();
        if (encontrarUsuario) {
            return res.status(404).json({ mensagem: "Conta existente" });
        };
        next();
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};


module.exports = alredyExist
