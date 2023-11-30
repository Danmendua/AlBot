const knex = require('../connections/databaseConnection');

const registerCostumer = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const body = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        };

        const insertClient = await knex('clientes').insert(body).returning('*');

        if (!insertClient) {
            return res.status(400).json({ mensagem: 'Erro ao cadastrar Cliente.' });
        };

        return res.status(201).json(insertClient);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};


const editCostumer = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    try {
        const costumerFound = await knex('clientes').where({ id }).first();
        if (!costumerFound) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }



        const newClient = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        };

        const updated = await knex('clientes').where({ id }).update(newClient);

        if (!updated) {
            return res.status(400).json("O cliente não foi atualizado");
        }

        return res.status(200).json('Cliente foi atualizado com sucesso.');

    } catch (error) {
        // console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const listCostumers = async (req, res) => {
    try {
        const costumers = await knex('clientes').returning('*');
        return res.status(200).json(costumers);
    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro Interno do servidor' });
    };
};

const listCostumersById = async (req, res) => {
    const { id } = req.params;
    try {
        const costumerById = await knex('clientes').where({ id }).returning('*');
        if (costumerById.length === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' })
        }
        return res.status(200).json(costumerById);
    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro Interno do servidor' });
    };
};


module.exports = {
    registerCostumer,
    editCostumer,
    listCostumers,
    listCostumersById
}