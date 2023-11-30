const knex = require('../connections/databaseConnection');

const findCategory = async (req, res, next) => {
    const { categoria_id } = req.body;
    try {
        const categoryFound = await knex('categorias').where({ id: categoria_id }).first();
        if (!categoryFound) {
            return res.status(400).json("Categoria não encontrada");
        }
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const duplicateProduct = async (req, res, next) => {
    const { descricao, categoria_id } = req.body;
    try {
        const doubleProduct = await knex('produtos').where({ descricao: descricao });

        if (doubleProduct.length > 0) {
            const sameProductDifferenteId = await knex('produtos').whereNot({ categoria_id: categoria_id }).andWhere({ descricao: descricao }).first();
            if (sameProductDifferenteId) {
                return res.status(400).json('O produto não foi cadastrado pois já existe um igual mas com categoria_id diferente.');
            } else {
                return res.status(400).json('O produto não foi cadastrado pois já existe um igual');
            };
        };
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const findProductById = async (req, res, next) => {
    const { id } = req.params
    try {
        const productFound = await knex('produtos').where({ id }).first()
        if (!productFound) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' })
        };
        req.product = productFound;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    findCategory,
    duplicateProduct,
    findProductById
}