// Conexão com banco de dados MySQL
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'wm3_digital',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

// Testar conexão
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getDbPool().getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    console.error('Erro ao conectar com banco de dados:', error);
    return false;
  }
}

// Executar query
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  try {
    const [results] = await getDbPool().execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Erro ao executar query:', error);
    throw error;
  }
}

// Fechar conexão (útil para testes)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

