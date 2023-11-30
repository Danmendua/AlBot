const joi = require('joi');

const productSchema = joi.object({
    descricao: joi.string().trim().required().min(1).max(255).messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório',
        'string.min': 'Quantidade de caracteres inválido',
        'string.max': 'O campo descrição tem o limite máximo de {#limit} caracteres'
    }),
    quantidade_estoque: joi.number().integer().required().min(0).messages({
        'any.required': 'O campo de quantidade de estoque é obrigatório',
        'number.integer': 'Apenas valores inteiros são permitidos',
        'number.min': 'O valor minimo permitido é {#limit}',
        'number.base': 'O número informado não é um valor válido',
    }),
    valor: joi.number().integer().required().min(0).messages({
        'any.required': 'O campo valor é obrigatório',
        'number.integer': 'Apenas valores inteiros são permitidos',
        'number.min': 'O valor minimo permitido é {#limit}',
        'number.base': 'O número informado não é um valor válido',
    }),
    categoria_id: joi.number().integer().required().messages({
        'any.required': 'Obrigatório informar o ID da categoria',
        'number.integer': 'Apenas valores inteiros são permitidos',
        'number.base': 'O número informado não é um valor válido',
    }),
})

module.exports = productSchema