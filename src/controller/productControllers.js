const knex = require('../connections/databaseConnection');
const { uploadFile, deletArchives } = require('../services/images');

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;

    try {
        const insertProduct = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*');

        if (!insertProduct) {
            return res.status(400).json({ mensagem: 'O produto não cadastrado' });
        };

        if (file) {
            try {
                const image = await uploadFile(`products/${insertProduct[0].id}/${file.originalname}`, file.buffer, file.mimetype);
                await knex('produtos').where({ id: insertProduct[0].id }).update({ produto_imagem: image.url })
            } catch (error) {
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            };
        };

        const finalProduct = await knex('produtos').where({ id: insertProduct[0].id }).first();

        if (!finalProduct) {
            return res.status(400).json({ mensagem: 'O produto não foi cadastrado' });
        };


        return res.status(201).json(finalProduct);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;
    const productById = req.product

    try {
        const productFound = await knex('produtos').where({ descricao }).first();
        if (productFound && productFound.id !== req.product.id) {
            return res.status(400).json({ mensagem: 'Produto com descrição já existente' });
        };

        if (file) {
            try {
                if (productById.produto_imagem) {
                    const path = productById.produto_imagem.replace(/^.*?\/products\/\d+\//, `products/${id}/`);
                    await deletArchives(path);
                    await knex('produtos').where({ id: productById.id }).update({ produto_imagem: null })
                }
                const image = await uploadFile(`products/${productById.id}/${file.originalname}`, file.buffer, file.mimetype);
                await knex('produtos').where({ id: productById.id }).update({ produto_imagem: image.url })
            } catch (error) {
                return res.status(500).json({ mensagem: "Erro interno do servidor" });
            };
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
    const productByiD = req.product;
    try {

        if (productByiD.produto_imagem) {
            const path = productByiD.produto_imagem.replace(/^.*?\/products\/\d+\//, `products/${id}/`);
            await deletArchives(path);
        }

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