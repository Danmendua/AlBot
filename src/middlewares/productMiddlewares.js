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
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        const doubleProduct = await knex('produtos').where({ descricao: descricao, valor: valor, categoria_id: categoria_id });

        if (doubleProduct.length > 0) {
            const updateProduct = await knex('produtos').where({ categoria_id: categoria_id, valor: valor }).increment({ quantidade_estoque: quantidade_estoque }).returning('*');
            if (updateProduct) {
                return res.status(201).json('O estoque do produto foi atualizado com sucesso.');
            } else {
                return res.status(400).json('O produto não foi cadastrado');
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