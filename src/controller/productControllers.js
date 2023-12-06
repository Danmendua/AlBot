const knex = require('../connections/databaseConnection');

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const insertProduct = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');

        if (!insertProduct) {
            return res.status(400).json({ mensagem: 'O produto não cadastrado' });
        };

        return res.status(201).json(insertProduct[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        const productFound = await knex('produtos').where({ descricao }).first();
        if (productFound && productFound.id !== req.product.id) {
            return res.status(400).json({ mensagem: 'Produto com descrição já existente' });
        };
        const product = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        };

        const updated = await knex('produtos').where({ id }).update(product);

        if (!updated) {
            return res.status(400).json({ mensagem: "O produto não foi atualizado" });
        }

        return res.sendStatus(204)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const listProducts = async (req, res) => {
    const { categoria_id: filter } = req.query;
    try {
        if (Array.isArray(filter) && filter.length > 0) {
            const formatedFilter = filter.map(id => parseInt(id));
            const productsByCategory = await knex('produtos').whereIn('categoria_id', formatedFilter).returning('*');
            if (productsByCategory.length === 0) {
                return res.status(400).json({ mensagem: "Categoria não encontrada" });
            }
            return res.json(productsByCategory);
        } else if (filter && !Array.isArray(filter)) {
            const productsByOneCategory = await knex('produtos').where({ categoria_id: filter }).returning('*');
            if (productsByOneCategory.length === 0) {
                return res.status(400).json({ mensagem: "Categoria não encontrada" });
            }
            return res.status(200).json(productsByOneCategory);
        }
        const allProducts = await knex('produtos').orderBy('id');
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const listProductById = (req, res) => {
    return res.status(200).json(req.product);
};

const deleteProduct = async (req, res) => {
    const { id } = req.product;
    try {
        const deleteProduct = await knex('produtos').where({ id }).del();

        if (!deleteProduct) {
            return res.status(400).json({ mensagem: "O produto não foi excluido" });
        };

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};


module.exports = {
    registerProduct,
    updateProduct,
    listProducts,
    deleteProduct,
    listProductById
}