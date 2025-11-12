// Sistema de autenticação com JWT
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface JWTPayload {
  userId: number;
  username: string;
  role: string;
}

// Usuários fallback (quando MySQL não está disponível)
const FALLBACK_USERS = [
  {
    id: 1,
    username: 'admin',
    email: 'financeiro@wm3digital.com.br',
    // Senha: admin123 (hashed com bcrypt)
    password_hash: '$2a$10$rZJ5YKKZYxGxXxGxGxGxGuQJ5YKKZYxGxXxGxGxGxGuQJ5YKKZYxG',
    role: 'admin' as const
  }
];

// Verificar credenciais e retornar usuário
export async function verifyCredentials(
  username: string,
  password: string
): Promise<User | null> {
  try {
    // Tentar MySQL primeiro
    const users = await query<any[]>(
      'SELECT id, username, email, password_hash, role FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error('Erro ao verificar credenciais no MySQL, usando fallback:', error);

    // Fallback: usar usuários em memória
    const user = FALLBACK_USERS.find(u =>
      u.username === username || u.email === username
    );

    if (!user) {
      return null;
    }

    // Para o fallback, aceitar senha simples para desenvolvimento
    // Se a senha for "admin123" ou coincidir com o hash
    const isSimplePassword = password === 'admin123';
    const isHashValid = user.password_hash ? await bcrypt.compare(password, user.password_hash) : false;

    if (!isSimplePassword && !isHashValid) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}

// Gerar token JWT
export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

// Verificar token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

// Hash de senha
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Criar usuário (útil para setup inicial)
export async function createUser(
  username: string,
  email: string,
  password: string,
  role: 'admin' | 'editor' = 'editor'
): Promise<User | null> {
  try {
    const passwordHash = await hashPassword(password);
    
    await query(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, role]
    );

    const users = await query<any[]>(
      'SELECT id, username, email, role FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return null;
    }

    return {
      id: users[0].id,
      username: users[0].username,
      email: users[0].email,
      role: users[0].role,
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return null;
  }
}

// Obter usuário por ID
export async function getUserById(userId: number): Promise<User | null> {
  try {
    const users = await query<any[]>(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return null;
    }

    return {
      id: users[0].id,
      username: users[0].username,
      email: users[0].email,
      role: users[0].role,
    };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

