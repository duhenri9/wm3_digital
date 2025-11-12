-- Schema do banco de dados MySQL para WM3 Digital
-- Execute este script no seu banco de dados MySQL

-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS wm3_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE wm3_digital;

-- Tabela de usuários (para autenticação)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tags JSON,
  status ENUM('Disponível', 'Early Adopters', 'Em Desenvolvimento', 'Beta', 'Upcoming', 'Em Breve', 'Making & Beta') NOT NULL DEFAULT 'Em Desenvolvimento',
  show_in_landing BOOLEAN DEFAULT TRUE,
  category ENUM('servico', 'projeto') NOT NULL DEFAULT 'projeto',
  price VARCHAR(100),
  links JSON,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de configuração de links
CREATE TABLE IF NOT EXISTS links_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_config_key (config_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir usuário admin padrão (senha: admin123 - ALTERE EM PRODUÇÃO!)
-- IMPORTANTE: Execute o script create-admin-user.js para gerar o hash correto
-- Ou use um gerador online: https://bcrypt-generator.com/
-- Hash para "admin123": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO users (username, email, password_hash, role) 
VALUES ('admin', 'admin@wm3digital.com.br', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin')
ON DUPLICATE KEY UPDATE username=username;

-- Inserir configuração padrão de links
INSERT INTO links_config (config_key, config_value) 
VALUES ('main', JSON_OBJECT(
  'profile', JSON_OBJECT(
    'title', 'WM3 Digital',
    'description', 'SaaS, automação e marketing digital com habilidades excepcionais em design de websites',
    'avatar', '/wm3-icon.png'
  ),
  'socialLinks', JSON_ARRAY(
    JSON_OBJECT(
      'id', 'instagram',
      'title', 'Instagram',
      'url', 'https://instagram.com/wm3digital',
      'icon', 'instagram',
      'description', 'Siga-nos no Instagram',
      'color', 'from-pink-500 to-purple-500'
    ),
    JSON_OBJECT(
      'id', 'whatsapp',
      'title', 'WhatsApp',
      'url', 'https://wa.me/5511999999999',
      'icon', 'whatsapp',
      'description', 'Fale conosco no WhatsApp',
      'color', 'from-green-500 to-emerald-500'
    ),
    JSON_OBJECT(
      'id', 'email',
      'title', 'E-mail',
      'url', 'mailto:info@wm3digital.com.br',
      'icon', 'mail',
      'description', 'Envie-nos um e-mail',
      'color', 'from-blue-500 to-cyan-500'
    )
  ),
  'sections', JSON_ARRAY(
    JSON_OBJECT('id', 'available', 'title', 'Projetos Disponíveis', 'showInLinks', true),
    JSON_OBJECT('id', 'upcoming', 'title', 'Em Desenvolvimento', 'showInLinks', true),
    JSON_OBJECT('id', 'social', 'title', 'Conecte-se Conosco', 'showInLinks', true)
  )
))
ON DUPLICATE KEY UPDATE config_value=config_value;

