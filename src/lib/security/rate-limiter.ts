/**
 * Rate Limiter para APIs de IA
 * Previne abuso limitando requisições por IP e serviço
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
  costTotal: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();

  // Configurações de limite
  private readonly config = {
    maxRequestsPerIP: 10,        // 10 requisições por IP
    windowMs: 60 * 60 * 1000,    // 1 hora
    maxCostPerIP: 5.0,           // R$ 5,00 por IP/hora
    maxRequestsPerService: 50,    // 50 requisições por serviço/hora
    maxDailyCost: 100.0,          // R$ 100,00 por dia total
  };

  /**
   * Verifica se IP pode fazer requisição
   */
  checkLimit(ip: string, service: string): {
    allowed: boolean;
    remaining: number;
    resetAt: number;
    reason?: string;
  } {
    const key = `${ip}:${service}`;
    const now = Date.now();

    let entry = this.limits.get(key);

    // Criar nova entry ou resetar se expirou
    if (!entry || entry.resetAt < now) {
      entry = {
        count: 0,
        resetAt: now + this.config.windowMs,
        costTotal: 0,
      };
      this.limits.set(key, entry);
    }

    // Verificar limite de requisições
    if (entry.count >= this.config.maxRequestsPerIP) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
        reason: `Limite de ${this.config.maxRequestsPerIP} requisições/hora atingido`,
      };
    }

    // Verificar limite de custo
    if (entry.costTotal >= this.config.maxCostPerIP) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
        reason: `Limite de custo R$ ${this.config.maxCostPerIP}/hora atingido`,
      };
    }

    return {
      allowed: true,
      remaining: this.config.maxRequestsPerIP - entry.count,
      resetAt: entry.resetAt,
    };
  }

  /**
   * Registra uma requisição e seu custo
   */
  recordRequest(ip: string, service: string, cost: number): void {
    const key = `${ip}:${service}`;
    const entry = this.limits.get(key);

    if (entry) {
      entry.count++;
      entry.costTotal += cost;
    }
  }

  /**
   * Limpa entries expiradas (executar periodicamente)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (entry.resetAt < now) {
        this.limits.delete(key);
      }
    }
  }

  /**
   * Obtém estatísticas globais
   */
  getStats(): {
    totalRequests: number;
    uniqueIPs: number;
    totalCost: number;
  } {
    const ips = new Set<string>();
    let totalRequests = 0;
    let totalCost = 0;

    for (const [key, entry] of this.limits.entries()) {
      const ip = key.split(':')[0];
      ips.add(ip);
      totalRequests += entry.count;
      totalCost += entry.costTotal;
    }

    return {
      totalRequests,
      uniqueIPs: ips.size,
      totalCost,
    };
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Cleanup a cada 5 minutos
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);
