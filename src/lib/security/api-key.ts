const rawKeys = process.env.WM3_API_KEYS ?? '';
const API_KEYS = rawKeys
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);

export function verifyApiKey(authHeader?: string): boolean {
  if (!API_KEYS.length) {
    console.warn('[api-key] Nenhuma WM3_API_KEYS configurada. Bloqueando requisições.');
    return false;
  }
  if (!authHeader?.toLowerCase().startsWith('bearer ')) {
    return false;
  }
  const key = authHeader.slice(7).trim();
  return API_KEYS.includes(key);
}
