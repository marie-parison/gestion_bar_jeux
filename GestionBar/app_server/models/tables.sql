CREATE DATABASE IF NOT EXISTS gestion_bar;
USE gestion_bar;

CREATE TABLE IF NOT EXISTS tables
(
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
);


CREATE TABLE IF NOT EXISTS game_categories
(
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
cat_name VARCHAR(255) UNIQUE NOT NULL,
);

CREATE TABLE IF NOT EXISTS games
(
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
game_name VARCHAR(255) UNIQUE NOT NULL,
category BIGINT NOT NULL,
available BOOLEAN NOT NULL DEFAULT true,
FOREIGN KEY(category) REFERENCES game_categories(id)
);

CREATE TABLE IF NOT EXISTS tables_games
(
id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_table BIGINT NOT NULL,
id_game BIGINT NOT NULL,
FOREIGN KEY(id_table) REFERENCES tables(id)
FOREIGN KEY(id_game) REFERENCES games(id)
);