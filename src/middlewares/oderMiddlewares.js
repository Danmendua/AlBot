const knex = require('../connections/databaseConnection');

const verifyProducts = async (req, res, next) => {
    const { pedido_produtos } = req.body;
    let total = 0
    try {
        for (const each of pedido_produtos) {
            const { produto_id, quantidade_produto } = each;
            const productFound = await knex('produtos').where({ id: produto_id }).first();
            if (!productFound) {
                return res.status(400).json({ mensagem: "Um ou mais produtos não existem no banco de dados." });
            } else if (productFound.quantidade_estoque < quantidade_produto) {
                return res.status(400).json({ mensagem: "Um ou mais produtos sem estoque." });
            };
            total += productFound.valor * quantidade_produto
        };
        req.total = total;
        return next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

module.exports = {
    verifyProducts
}