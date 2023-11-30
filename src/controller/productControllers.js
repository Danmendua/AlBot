const knex = require('../connections/databaseConnection');

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        const insertProduct = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id });

        if (!insertProduct) {
            return res.status(400).json('O produto não foi cadastrado');
        };

        return res.status(201).json('O produto foi cadastrado com sucesso.');
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {
        const existingProduct = await knex('produtos').whereNot({ id: id }).andWhere({ descricao: descricao, valor: valor, categoria_id: categoria_id }).first();
        if (existingProduct) {
            const newStock = parseInt(existingProduct.quantidade_estoque) + parseInt(quantidade_estoque);
            await knex('produtos').where({ id: existingProduct.id }).update({ quantidade_estoque: newStock });
            await knex('produtos').where({ id }).del();
            return res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
        } else {
            const product = {
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            };

            const updated = await knex('produtos').where({ id }).update(product);

            if (!updated) {
                return res.status(400).json("O produto não foi atualizado");
            }

            return res.status(200).json('Produto foi atualizado com sucesso.');
        }
    } catch (error) {
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
                return res.status(400).json("Nenhuma categoria não encontrada");
            }
            return res.json(productsByCategory);
        } else if (filter && !Array.isArray(filter)) {
            const productsByOneCategory = await knex('produtos').where({ categoria_id: filter }).returning('*');
            if (productsByOneCategory.length === 0) {
                return res.status(400).json("Categoria não encontrada");
            }
            return res.status(200).json(productsByOneCategory);
        }
        const allProducts = await knex('produtos');
        return res.status(200).json(allProducts)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const deleteProduct = async (req, res) => {
    const { id } = req.product;
    try {
        const deleteProduct = await knex('produtos').where({ id }).del();

        if (!deleteProduct) {
            return res.status(400).json("O produto não foi excluido");
        };

        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};


module.exports = {
    registerProduct,
    updateProduct,
    listProducts,
    deleteProduct
}