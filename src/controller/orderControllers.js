const knex = require('../connections/databaseConnection');
const send = require('../connections/nodemailer');
const htmlCompiler = require('../services/htmlCompiler');

const registerOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;
    const totalPrice = req.total;
    const listProducts = [];
    const { nome, email } = req.costumer;
    try {
        const registerTotalOrder = await knex('pedidos').insert({ cliente_id, observacao, valor_total: totalPrice }).returning('*');
        for (const each of pedido_produtos) {

            const { valor, descricao } = await knex('produtos').where({ id: each.produto_id }).first();

            listProducts.push(descricao);

            await knex('pedido_produtos').insert({ pedido_id: registerTotalOrder[0].id, produto_id: each.produto_id, quantidade_produto: each.quantidade_produto, valor_produto: valor }).returning('*');

            await knex('produtos').where({ id: each.produto_id }).decrement({ quantidade_estoque: each.quantidade_produto });
        };

        const returnObject = {
            id: registerTotalOrder[0].id,
            observacao: registerTotalOrder[0].observacao,
            produtos: listProducts,
            valor_total: registerTotalOrder[0].valor_total
        };

        const productsArrayToString = listProducts.join(', ')
        const valueToReal = (registerTotalOrder[0].valor_total / 100);
        const html = await htmlCompiler('./src/templates/email.html', {
            userName: nome,
            purchasedItems: productsArrayToString,
            totalItems: valueToReal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        });

        await send(email, 'Confirmação de Compra', html);

        return res.status(201).json(returnObject);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const listOrders = async (req, res) => {
    const { cliente_id } = req.query;
    try {
        const query = knex('pedidos')
            .select({
                pedido_id: 'pedidos.id',
                valor_total: 'pedidos.valor_total',
                observacao: 'pedidos.observacao',
                cliente_id: 'pedidos.cliente_id',
                pedido_produto_id: 'pedido_produtos.id',
                quantidade_produto: 'pedido_produtos.quantidade_produto',
                valor_produto: 'produtos.valor',
                pedido_id: 'pedido_produtos.pedido_id',
                produto_id: 'pedido_produtos.produto_id'
            })
            .leftJoin('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
            .leftJoin('produtos', 'pedido_produtos.produto_id', 'produtos.id').modify((queryBuilder) => {
                if (cliente_id) {
                    queryBuilder.where('pedidos.cliente_id', cliente_id);
                }
            });

        const orders = await query;

        const groupedOrders = {};

        for (const each of orders) {
            const {
                pedido_id,
                valor_total,
                observacao,
                cliente_id,
                pedido_produto_id,
                quantidade_produto,
                valor_produto,
                produto_id
            } = each;

            if (!groupedOrders[pedido_id]) {
                groupedOrders[pedido_id] = {
                    pedido: { id: pedido_id, valor_total, observacao, cliente_id },
                    pedido_produtos: []
                };
            };

            groupedOrders[pedido_id].pedido_produtos.push({
                id: pedido_produto_id,
                quantidade_produto,
                valor_produto,
                pedido_id,
                produto_id
            });
        };

        for (const orderKey in groupedOrders) {
            groupedOrders[orderKey].pedido_produtos.sort((a, b) => a.id - b.id);
        }
        const finalList = Object.values(groupedOrders);

        return res.status(200).json(finalList);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

module.exports = {
    registerOrder,
    listOrders
};