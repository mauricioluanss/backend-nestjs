CREATE DATABASE IF NOT EXISTS `controle-planos-operadora` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'gestao'@'%' IDENTIFIED BY 'gestao';
GRANT ALL PRIVILEGES ON `controle-planos-operadora`.* TO 'gestao'@'%';
