/**
 * Circuit Breaker - Proteção automática contra gastos excessivos
 * Para automaticamente o serviço se limites críticos forem atingidos
 */

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitConfig {
  failureThreshold: number;    // Número de falhas para abrir
  successThreshold: number;     // Sucessos necessários para fechar
  timeout: number;              // Tempo em OPEN antes de tentar HALF_OPEN (ms)
  costThreshold: number;        // Custo máximo antes de abrir
}

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime = 0;
  private totalCost = 0;
  private openedReason: string | null = null;

  private readonly config: CircuitConfig = {
    failureThreshold: 5,
    successThreshold: 2,
    timeout: 60 * 1000,           // 1 minuto
    costThreshold: 50.0,          // R$ 50,00 por dia
  };

  /**
   * Verifica se circuit permite execução
   */
  async execute<T>(
    operation: () => Promise<T>,
    context: { service: string; estimatedCost: number }
  ): Promise<T> {
    if (this.state === 'OPEN') {
      // Verificar se deve tentar HALF_OPEN
      if (Date.now() - this.lastFailureTime >= this.config.timeout) {
        this.state = 'HALF_OPEN';
        console.log(`🔄 [Circuit Breaker] Entrando em HALF_OPEN para ${context.service}`);
      } else {
        throw new Error(
          `Circuit Breaker OPEN: ${this.openedReason || 'Muitas falhas ou custos excessivos'}. ` +
          `Tente novamente em ${Math.ceil((this.config.timeout - (Date.now() - this.lastFailureTime)) / 1000)}s`
        );
      }
    }

    try {
      // Verificar custo antes de executar
      this.totalCost += context.estimatedCost;
      if (this.totalCost > this.config.costThreshold) {
        this.open(`Custo total excedeu R$ ${this.config.costThreshold.toFixed(2)}`);
        throw new Error(`Circuit Breaker OPEN: Limite de custo atingido`);
      }

      const result = await operation();

      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure(error);
      throw error;
    }
  }

  /**
   * Registra sucesso
   */
  private onSuccess(): void {
    this.failureCount = 0;

    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.config.successThreshold) {
        this.close();
      }
    }
  }

  /**
   * Registra falha
   */
  private onFailure(error: unknown): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ [Circuit Breaker] Falha registrada (${this.failureCount}/${this.config.failureThreshold}): ${errorMessage}`);

    if (this.failureCount >= this.config.failureThreshold) {
      this.open(`Limite de falhas atingido (${this.failureCount})`);
    }

    if (this.state === 'HALF_OPEN') {
      this.open('Falha durante HALF_OPEN');
    }
  }

  /**
   * Abre o circuit
   */
  private open(reason: string): void {
    this.state = 'OPEN';
    this.openedReason = reason;
    this.successCount = 0;
    console.error(`🚨 [Circuit Breaker] OPEN: ${reason}`);

    // Disparar alerta (pode integrar com Slack, email, etc)
    this.sendAlert(reason);
  }

  /**
   * Fecha o circuit
   */
  private close(): void {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.openedReason = null;
    console.log(`✅ [Circuit Breaker] CLOSED: Sistema recuperado`);
  }

  /**
   * Reseta custos (executar diariamente)
   */
  resetCosts(): void {
    this.totalCost = 0;
    console.log(`🔄 [Circuit Breaker] Custos resetados`);
  }

  /**
   * Reseta circuit manualmente (use com cuidado)
   */
  reset(): void {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.totalCost = 0;
    this.openedReason = null;
    console.log(`🔄 [Circuit Breaker] Reset manual executado`);
  }

  /**
   * Obtém status atual
   */
  getStatus(): {
    state: CircuitState;
    failureCount: number;
    totalCost: number;
    openedReason: string | null;
  } {
    return {
      state: this.state,
      failureCount: this.failureCount,
      totalCost: this.totalCost,
      openedReason: this.openedReason,
    };
  }

  /**
   * Dispara alerta (implementar integração real)
   */
  private sendAlert(reason: string): void {
    // TODO: Integrar com Slack, Discord, Email, etc
    console.error(`🚨🚨🚨 ALERTA CRÍTICO: Circuit Breaker OPEN - ${reason}`);

    // Em produção, você pode enviar para:
    // - Slack: await fetch(SLACK_WEBHOOK_URL, { ... })
    // - Email: await sendEmail({ subject: 'Circuit Breaker Alert', ... })
    // - Discord: await fetch(DISCORD_WEBHOOK_URL, { ... })
  }
}

// Singleton instance
export const circuitBreaker = new CircuitBreaker();

// Reset custos diariamente à meia-noite
const scheduleDailyReset = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const msUntilMidnight = tomorrow.getTime() - now.getTime();

  setTimeout(() => {
    circuitBreaker.resetCosts();
    scheduleDailyReset(); // Reagendar para próximo dia
  }, msUntilMidnight);
};

scheduleDailyReset();
