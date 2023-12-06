const joi = require('joi');

const costumerSchema = joi.object({
    nome: joi.string().trim().required().min(1).max(80).messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.min': 'Quantidade de caracteres inválido',
        'string.max': 'O campo nome tem o limite máximo de {#limit} caracteres'
    }),

    email: joi.string().trim().email().required().min(1).max(80).messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido',
        'string.min': 'Quantidade de caracteres inválido',
        'string.max': 'O campo email tem o limite máximo de {#limit} caracteres'
    }),

    cpf: joi.string().trim().regex(/^\d+$/).required().min(11).max(11).messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório',
        'string.pattern.base': 'O CPF deve conter apenas números, sem pontos ou traços',
        'string.min': 'O campo cpf tem o limite minimo de {#limit} caracteres',
        'string.max': 'O campo cpf tem o limite máximo de {#limit} caracteres',
    }),

    cep: joi.string().trim().regex(/^\d+$/).min(8).max(8).messages({
        'string.pattern.base': 'O CEP deve conter apenas números',
        'string.pattern.base': 'O CEP deve conter apenas números, sem pontos ou traços',
        'string.empty': 'Caso informado o CEP, o campo não pode estar vazio',
        'string.min': 'O campo CEP tem o limite minimo de {#limit} caracteres',
        'string.max': 'O campo CEP tem o limite máximo de {#limit} caracteres',
    }),

    rua: joi.string().trim().min(1).max(255).message({
        'string.empty': 'Caso informado a rua, o campo não pode estar vazio',
        'string.min': 'O campo rua tem o limite minimo de {#limit} caracteres',
        'string.max': 'O campo rua tem o limite máximo de {#limit} caracteres',
    }),

    numero: joi.number().integer().positive().messages({
        'number.integer': 'Apenas valores inteiros são permitidos',
        'number.positive': 'Valor inválido, tente um numero positivo',
        'number.base': 'Apenas numeros inteiros são permitidos',

    }),

    bairro: joi.string().max(255).message({
        'string.empty': 'Caso informado o bairro, o campo não pode estar vazio',
        'string.max': 'O campo bairro tem o limite máximo de {#limit} caracteres',
    }),

    cidade: joi.string().max(80).message({
        'string.empty': 'Caso informado a cidade, o campo não pode estar vazio',
        'string.max': 'O campo cidade tem o limite máximo de {#limit} caracteres',
    }),

    estado: joi.string().min(2).max(2).message({
        'string.empty': 'Caso informado o estado, o campo não pode estar vazio',
        'string.min': 'Preencha um sigla de estado válido.',
        'string.max': 'Limite de {#limit} siglas',
    })
});

module.exports = costumerSchema