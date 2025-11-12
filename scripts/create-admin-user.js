// Script para criar usuário admin no banco de dados
// Execute: node scripts/create-admin-user.js

const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';
  const email = process.argv[4] || 'admin@wm3digital.com.br';

  console.log(`Criando usuário: ${username}`);
  console.log(`Email: ${email}`);
  console.log(`Senha: ${password}`);

  // Gerar hash da senha
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(`Hash gerado: ${passwordHash}`);

  // Conectar ao banco
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'wm3_digital',
  });

  try {
    // Verificar se usuário já existe
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      // Atualizar senha
      await connection.execute(
        'UPDATE users SET password_hash = ?, role = ? WHERE username = ?',
        [passwordHash, 'admin', username]
      );
      console.log('✅ Usuário atualizado com sucesso!');
    } else {
      // Criar novo usuário
      await connection.execute(
        'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [username, email, passwordHash, 'admin']
      );
      console.log('✅ Usuário criado com sucesso!');
    }
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

createAdminUser().catch(console.error);

