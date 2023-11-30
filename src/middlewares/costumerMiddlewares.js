const knex = require('../connections/databaseConnection');

const cpfEmailAlredyExist = async (req, res, next) => {
    const { email, cpf } = req.body;
    const costumer = req.costumer

    try {
        const searchByEmail = await knex('clientes').where({ email }).first();

        const searchByCpf = await knex('clientes').where({ cpf }).first();

        if (searchByEmail && searchByEmail.email !== costumer.email) {
            return res.status(404).json({ mensagem: "Email já cadastrado" });
        } else if (searchByCpf && searchByCpf.cpf !== costumer.cpf) {
            return res.status(404).json({ mensagem: "CPF já cadastrado" });
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
    }
}


module.exports = {
    cpfEmailAlredyExist,
    findCostumerById
}