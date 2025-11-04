-- Script para criar usuários no banco de dados

-- Criar admin
INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn) 
VALUES ('admin-elevaconstrutech', 'Laizo Silva', 'elevaconstrutech@gmail.com', 'admin', 'oauth', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE role = 'admin';

-- Criar colaborador
INSERT INTO users (openId, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn) 
VALUES ('collab-laizoss', 'Laizo Silva', 'laizoss@gmail.com', 'user', 'oauth', NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE role = 'user';

-- Criar perfis de colaborador
INSERT INTO employees (userId, name, email, dailyRate, status, createdAt, updatedAt)
SELECT id, 'Laizo Silva', 'laizoss@gmail.com', 10000, 'active', NOW(), NOW()
FROM users WHERE email = 'laizoss@gmail.com'
ON DUPLICATE KEY UPDATE status = 'active';

-- Criar obra padrão
INSERT INTO works (name, description, status, createdAt, updatedAt)
VALUES ('Obra Principal', 'Obra principal da empresa', 'active', NOW(), NOW())
ON DUPLICATE KEY UPDATE status = 'active';
