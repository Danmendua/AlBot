const knex = require('../connections/databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const encriptedPassword = await bcrypt.hash(senha, 10);
        const newUser = await knex('usuarios').insert({ nome, email, senha: encriptedPassword }).returning(['id', 'nome', 'email']);

        if (!newUser) {
            return res.status(400).json({ mensagem: "Usário não cadastrado" });
        };

        return res.status(201).json(newUser[0]);
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const userFound = await knex('usuarios').where({ email }).first();

        if (!userFound) {
            return res.status(400).json({ mensagem: "Usário não encontrado" });
        }

        const verifyPassword = await bcrypt.compare(senha, userFound.senha);

        if (!verifyPassword) {
            return res.status(400).json({ mensagem: "O email ou senha não conferem" });
        }

        const token = jwt.sign({ id: userFound.id }, process.env.JWT, { expiresIn: '8h' });

        const { senha: _, ...userData } = userFound;

        return res.status(200).json({
            usuario: userData,
            token
        });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const identifyUser = async (req, res) => {
    return res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {

        const body = {
            nome,
            email,
            senha
        };

        if (email) {
            if (email !== req.user.email) {
                const userFound = await knex('usuarios').where({ email });

                if (userFound.length > 0) {
                    return res.status(400).json({ mensagem: "O email já existe" });
                };
            };
        };

        if (senha) {
            body.senha = await bcrypt.hash(senha, 10);
        };

        const userUpdated = await knex('usuarios').where('id', req.user.id).update(body).returning('*');

        if (!userUpdated) {
            return res.status(400).json({ mensagem: "Usuário não foi atualializado" });
        };

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

module.exports = {
    createUser,
    loginUser,
    identifyUser,
    updateUser
}