CREATE DATABASE pdv_cubos;

DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS pedido_produtos;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(500) NOT NULL
);

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

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) UNIQUE,
    quantidade_estoque INT NOT NULL, 
    valor INT, 
    categoria_id INT NOT NULL REFERENCES categorias(id),
    produto_imagem TEXT
);

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

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id) NOT NULL,
    observacao VARCHAR(255),
    valor_total INT NOT NULL
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id) NOT NULL,
    produto_id INT REFERENCES produtos(id) NOT NULL,
    quantidade_produto INT NOT NULL,
    valor_produto INT NOT NULL
);