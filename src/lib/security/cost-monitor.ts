/**
 * Cost Monitor - Monitoramento de custos em tempo real
 * Rastreia gastos com APIs de IA e dispara alertas
 */

interface CostEntry {
  service: string;
  cost: number;
  timestamp: number;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

interface DailyStats {
  date: string;
  totalCost: number;
  totalRequests: number;
  services: Record<string, { cost: number; requests: number }>;
}

class CostMonitor {
  private entries: CostEntry[] = [];
  private readonly MAX_ENTRIES = 10000; // Manter últimas 10k entries

  // Limites configuráveis
  private readonly limits = {
    dailyLimit: 100.0,       // R$ 100/dia
    hourlyLimit: 20.0,       // R$ 20/hora
    monthlyLimit: 2000.0,    // R$ 2.000/mês
    perRequestLimit: 2.0,    // R$ 2,00 por requisição
  };

  /**
   * Registra uma geração e seu custo
   */
  record(entry: Omit<CostEntry, 'timestamp'>): void {
    this.entries.push({
      ...entry,
      timestamp: Date.now(),
    });

    // Limitar tamanho do array
    if (this.entries.length > this.MAX_ENTRIES) {
      this.entries = this.entries.slice(-this.MAX_ENTRIES);
    }

    // Verificar alertas
    this.checkAlerts(entry);
  }

  /**
   * Verifica se pode processar requisição baseado em custos
   */
  canProcess(estimatedCost: number): {
    allowed: boolean;
    reason?: string;
    currentDailyCost?: number;
    dailyRemaining?: number;
  } {
    const dailyCost = this.getDailyCost();

    // Verificar custo por requisição
    if (estimatedCost > this.limits.perRequestLimit) {
      return {
        allowed: false,
        reason: `Custo estimado (R$ ${estimatedCost.toFixed(2)}) excede limite por requisição (R$ ${this.limits.perRequestLimit.toFixed(2)})`,
      };
    }

    // Verificar limite diário
    if (dailyCost + estimatedCost > this.limits.dailyLimit) {
      return {
        allowed: false,
        reason: `Limite diário atingido. Gasto hoje: R$ ${dailyCost.toFixed(2)} / R$ ${this.limits.dailyLimit.toFixed(2)}`,
        currentDailyCost: dailyCost,
        dailyRemaining: Math.max(0, this.limits.dailyLimit - dailyCost),
      };
    }

    return {
      allowed: true,
      currentDailyCost: dailyCost,
      dailyRemaining: this.limits.dailyLimit - dailyCost - estimatedCost,
    };
  }

  /**
   * Obtém custo total do dia atual
   */
  private getDailyCost(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.entries
      .filter((e) => {
        const entryDate = new Date(e.timestamp).toISOString().split('T')[0];
        return entryDate === today;
      })
      .reduce((sum, e) => sum + e.cost, 0);
  }

  /**
   * Obtém custo da última hora
   */
  private getHourlyCost(): number {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    return this.entries
      .filter((e) => e.timestamp >= oneHourAgo)
      .reduce((sum, e) => sum + e.cost, 0);
  }

  /**
   * Obtém custo do mês atual
   */
  getMonthlyCost(): number {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    return this.entries
      .filter((e) => {
        const entryMonth = new Date(e.timestamp).toISOString().substring(0, 7);
        return entryMonth === thisMonth;
      })
      .reduce((sum, e) => sum + e.cost, 0);
  }

  /**
   * Obtém estatísticas detalhadas
   */
  getStats(): {
    daily: DailyStats;
    hourly: { cost: number; requests: number };
    monthly: { cost: number; requests: number };
    limits: CostMonitor['limits'];
  } {
    const today = new Date().toISOString().split('T')[0];
    const dailyEntries = this.entries.filter((e) => {
      const entryDate = new Date(e.timestamp).toISOString().split('T')[0];
      return entryDate === today;
    });

    const dailyServices: Record<string, { cost: number; requests: number }> = {};
    dailyEntries.forEach((e) => {
      if (!dailyServices[e.service]) {
        dailyServices[e.service] = { cost: 0, requests: 0 };
      }
      dailyServices[e.service].cost += e.cost;
      dailyServices[e.service].requests++;
    });

    return {
      daily: {
        date: today,
        totalCost: this.getDailyCost(),
        totalRequests: dailyEntries.length,
        services: dailyServices,
      },
      hourly: {
        cost: this.getHourlyCost(),
        requests: this.entries.filter((e) => e.timestamp >= Date.now() - 3600000).length,
      },
      monthly: {
        cost: this.getMonthlyCost(),
        requests: this.entries.filter((e) => {
          const now = new Date();
          const entryDate = new Date(e.timestamp);
          return entryDate.getMonth() === now.getMonth() &&
                 entryDate.getFullYear() === now.getFullYear();
        }).length,
      },
      limits: this.limits,
    };
  }

  /**
   * Verifica e dispara alertas de custo
   */
  private checkAlerts(entry: Omit<CostEntry, 'timestamp'>): void {
    const dailyCost = this.getDailyCost();
    const monthlyCost = this.getMonthlyCost();

    // Alerta: 80% do limite diário
    if (dailyCost >= this.limits.dailyLimit * 0.8) {
      console.warn(`⚠️ [Cost Alert] Gasto diário em 80%: R$ ${dailyCost.toFixed(2)} / R$ ${this.limits.dailyLimit.toFixed(2)}`);
    }

    // Alerta: 90% do limite mensal
    if (monthlyCost >= this.limits.monthlyLimit * 0.9) {
      console.error(`🚨 [Cost Alert] Gasto mensal em 90%: R$ ${monthlyCost.toFixed(2)} / R$ ${this.limits.monthlyLimit.toFixed(2)}`);
    }

    // Alerta: Requisição cara
    if (entry.cost > this.limits.perRequestLimit * 0.8) {
      console.warn(`⚠️ [Cost Alert] Requisição cara: R$ ${entry.cost.toFixed(2)} (${entry.service})`);
    }
  }

  /**
   * Exporta dados para análise
   */
  exportData(): CostEntry[] {
    return [...this.entries];
  }

  /**
   * Reseta contadores (usar com cuidado)
   */
  reset(): void {
    this.entries = [];
    console.log('🔄 [Cost Monitor] Contadores resetados');
  }
}

// Singleton instance
export const costMonitor = new CostMonitor();

// Log stats a cada hora
setInterval(() => {
  const stats = costMonitor.getStats();
  console.log('📊 [Cost Stats]', {
    daily: `R$ ${stats.daily.totalCost.toFixed(2)}`,
    monthly: `R$ ${stats.monthly.cost.toFixed(2)}`,
    requests: stats.daily.totalRequests,
  });
}, 60 * 60 * 1000);
