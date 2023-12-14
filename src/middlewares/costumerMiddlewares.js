const knex = require('../connections/databaseConnection');

const cpfEmailAlredyExist = async (req, res, next) => {
    const { email, cpf } = req.body;

    try {
        const searchCostumer = await knex('clientes').where({ cpf }).orWhere({ email });

        if (searchCostumer.length > 0) {
            return res.status(404).json({ mensagem: "Email ou cpf já cadastrados" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const findCostumerById = async (req, res, next) => {
    const { id } = req.params

    try {
        const costumerFound = await knex('clientes').where({ id }).first()

        if (!costumerFound) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        };

        req.costumer = costumerFound;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const validationUpdateUser = async (req, res, next) => {
    const { email, cpf } = req.body
    try {
        const costumerFoundByEmail = await knex('clientes').where({ email }).first();
        const costumerFoundByCpf = await knex('clientes').where({ cpf }).first();

        if (costumerFoundByCpf && costumerFoundByCpf.cpf !== req.costumer.cpf) {
            return res.status(400).json({ mensagem: 'Email ou cpf já cadastrados' });
        }

        if (costumerFoundByEmail && costumerFoundByEmail.email !== req.costumer.email) {
            return res.status(400).json({ mensagem: 'Email ou cpf já cadastrados' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const verifyCostumerId = async (req, res, next) => {
    const { cliente_id } = req.body;
    try {
        const costumerFound = await knex('clientes').where({ id: cliente_id }).first();
        if (!costumerFound) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado' });
        };
        req.costumer = costumerFound;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const checkCostumerId = async (req, res, next) => {
    const { cliente_id } = req.query;
    try {
        if (!Number(cliente_id)) {
            return res.status(400).json({ mensagem: 'Parametro ID inválido' });
        }

        const costumerFound = await knex('pedidos').where({ cliente_id }).first();

        if (!costumerFound) {
            return res.status(400).json({ mensagem: 'Pedido do cliente não encontrado' });
        };

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};


module.exports = {
    cpfEmailAlredyExist,
    findCostumerById,
    validationUpdateUser,
    verifyCostumerId,
    checkCostumerId
}