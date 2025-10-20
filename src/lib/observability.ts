type ObservabilitySeverity = 'info' | 'warn' | 'error';

export interface ObservabilityEvent<T = Record<string, unknown>> {
  name: string;
  severity?: ObservabilitySeverity;
  context?: T;
}

const severityConsole: Record<ObservabilitySeverity, (message?: unknown, ...optional: unknown[]) => void> =
  {
    info: console.log,
    warn: console.warn,
    error: console.error,
  };

export async function logIntegrationEvent<T extends Record<string, unknown>>({
  name,
  severity = 'info',
  context,
}: ObservabilityEvent<T>): Promise<void> {
  severityConsole[severity](`[observability] ${name}`, context ?? {});
}

export async function notifySupabase<T extends Record<string, unknown>>(
  event: ObservabilityEvent<T>,
): Promise<void> {
  const url = process.env.SUPABASE_METRICS_WEBHOOK;
  if (!url) {
    return;
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'wm3-landing', ...event }),
    });
  } catch (error) {
    severityConsole.error?.('[observability] supabase webhook failed', error);
  }
}

export async function triggerN8NWorkflow<T extends Record<string, unknown>>(
  event: ObservabilityEvent<T>,
): Promise<void> {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    return;
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel: 'wm3-landing', ...event }),
    });
  } catch (error) {
    severityConsole.error?.('[observability] n8n webhook failed', error);
  }
}

export async function recordLeadLifecycle<T extends Record<string, unknown>>(
  event: ObservabilityEvent<T>,
): Promise<void> {
  await Promise.all([logIntegrationEvent(event), notifySupabase(event), triggerN8NWorkflow(event)]);
}

export async function recordSyncEvent<T extends Record<string, unknown>>(
  event: ObservabilityEvent<T>,
): Promise<void> {
  await Promise.all([logIntegrationEvent(event), notifySupabase(event), triggerN8NWorkflow(event)]);
}
