const knex = require('../connections/databaseConnection');

const listCategories = async (req, res) => {
    try {
        const categories = await knex('categorias').returning('*');
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro Interno do servidor' });
    };
};

module.exports = {
    listCategories
}