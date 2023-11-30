CREATE DATABASE pdv_cubos;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

INSERT INTO categorias (descricao) VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    quantidade_estoque INT NOT NULL, 
    valor INT, 
    categoria_id INT NOT NULL REFERENCES categorias(id)
);

DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    cep VARCHAR(9),
    rua VARCHAR(255),
    numero VARCHAR(10),
    bairro VARCHAR(150),
    cidade VARCHAR(150),
    estado VARCHAR(2)
);