CREATE TABLE usuario (
id_usuario SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
nome_usuario VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(120) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
imagem_usuario VARCHAR(120),
tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('chef', 'comum')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE receita (
id_receita SERIAL PRIMARY KEY,
titulo VARCHAR(120) NOT NULL,
origem VARCHAR(80) NOT NULL,
imagem VARCHAR(120) NOT NULL,
id_usuario INTEGER NOT NULL
REFERENCES usuario(id_usuario) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorito (
id_favorito SERIAL PRIMARY KEY,
id_usuario INTEGER NOT NULL
REFERENCES usuario(id_usuario) ON DELETE CASCADE,
id_receita INTEGER NOT NULL
REFERENCES receita(id_receita) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT favorito_unico UNIQUE (id_usuario, id_receita)
);

INSERT INTO usuario (nome, nome_usuario, email, senha, imagem_usuario, tipo) VALUES
('Chef Marco Bianchi', 'chef1', 'chef1@saepchef.com', '123456', 'chef1.jpg', 'chef'),
('Chef Ana Ferreira', 'chef2', 'chef2@saepchef.com', '123456', 'chef2.jpg', 'chef'),
('Chef Lucas Tanaka', 'chef3', 'chef3@saepchef.com', '123456', 'chef3.jpg', 'chef'),
('Mariana Costa', 'usuario1', 'usuario1@gmail.com', '123456', 'usuario1.jpg', 'comum'),
('Rafael Souza', 'usuario2', 'usuario2@gmail.com', '123456', 'usuario2.jpg', 'comum'),
('Beatriz Lima', 'usuario3', 'usuario3@gmail.com', '123456', 'usuario3.jpg', 'comum'),
('SAEPChef', 'SAEPChef', 'contato@saepchef.com', '123456', 'saepchef.jpg', 'comum');

INSERT INTO receita (titulo, origem, imagem, id_usuario) VALUES
('Risoto de Funghi', 'Itália', 'receita1.jpg', 1),
('Ratatouille', 'França', 'receita6.jpg', 1),
('Pizza Margherita', 'Itália', 'receita8.jpg', 1),
('Feijoada', 'Brasil', 'receita3.jpg', 2),
('Paella', 'Espanha', 'receita4.jpg', 2),
('Tacos', 'México', 'receita5.jpg', 2),
('Sushi Variado', 'Japão', 'receita2.jpg', 3),
('Curry', 'Índia', 'receita7.jpg', 3),
('Pad Thai', 'Tailândia', 'receita9.jpg', 3);
-- alguns favoritos, para o contador do mural não nascer zerado
INSERT INTO favorito (id_usuario, id_receita) VALUES
(4, 1), (5, 1), (6, 1), (4, 2), (5, 4), (6, 7), (2, 9), (3, 3);
