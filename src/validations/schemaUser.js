const joi = require('joi');

const userBodySchema = joi.object({
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

    senha: joi.string().trim().required().min(3).max(500).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.min': 'O campo senha precisa de no mínimo {#limit} caracteres',
        'string.max': 'O campo email tem o limite máximo de {#limit} caracteres'
    }),
});

const userLoginSchema = joi.object({
    email: joi.string().trim().email().required().min(1).max(80).messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido',
        'string.min': 'Quantidade de caracteres inválido',
        'string.max': 'O campo email tem o limite máximo de {#limit} caracteres'
    }),
    senha: joi.string().trim().required().min(3).max(500).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.min': 'O campo senha tem o limite mínimo de {#limit} caracteres',
        'string.max': 'O campo email tem o limite máximo de {#limit} caracteres'
    }),
});

const updateUserSchema = joi.object({
    nome: joi.string().trim().required().min(1).max(80).messages({
        'any.required': 'O campo nome está vazio',
        'string.empty': 'O campo nome está vazio',
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

    senha: joi.string().trim().min(3).required().max(500).messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.min': 'O campo senha precisa de no mínimo {#limit} caracteres',
        'string.max': 'O campo email tem o limite máximo de {#limit} caracteres'
    }),
})


module.exports = {
    userBodySchema,
    userLoginSchema,
    updateUserSchema
};