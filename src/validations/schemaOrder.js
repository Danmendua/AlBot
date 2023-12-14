const joi = require('joi');

const orderBodySchema = joi.object({
    cliente_id: joi.number().integer().required().positive().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.integer': 'Apenas valores inteiros são permitidos',
        'number.positive': 'Valor inválido, tente um numero positivo',
        'number.base': 'O número informado não é um valor válido',
    }),

    observacao: joi.string().trim().max(255).messages({
        'any.required': 'O campo observacao está vazio',
        'string.empty': 'O campo observacao está vazio',
        'string.max': 'O campo observacao tem o limite máximo de {#limit} caracteres'
    }),

    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: joi.number().integer().required().min(1).messages({
                'any.required': 'O campo produto_id é obrigatório',
                'number.integer': 'Apenas valores inteiros são permitidos',
                'number.min': 'O valor minimo permitido é {#limit}',
                'number.base': 'O número informado não é um valor válido',
            }),

            quantidade_produto: joi.number().integer().required().min(0).messages({
                'any.required': 'O campo produto_id é obrigatório',
                'number.integer': 'Apenas valores inteiros são permitidos',
                'number.min': 'O valor minimo permitido é {#limit}',
                'number.base': 'O número informado não é um valor válido',
            })
        })
    ).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório, junto com o produto_id e quantidade_produto',
    })
});

module.exports = orderBodySchema;