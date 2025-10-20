import { serviceOfferings } from '@/data';

import { recordLeadLifecycle } from './observability';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedInterests = new Set(serviceOfferings.map((service) => service.name));

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message?: string;
  source?: string;
}

export interface LeadMetadata {
  origin?: string | null;
  userAgent?: string | null;
  ip?: string | null;
}

export interface LeadGatewayResult {
  status: 'stored' | 'pending' | 'failed';
  message: string;
  payload: LeadPayload;
}

export class LeadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LeadValidationError';
  }
}

export function sanitizeLeadPayload(payload: unknown): LeadPayload {
  if (!payload || typeof payload !== 'object') {
    throw new LeadValidationError('Payload inválido.');
  }

  const {
    name,
    email,
    company,
    interest,
    message,
    source,
  } = payload as Record<string, unknown>;

  if (typeof name !== 'string' || name.trim().length < 3) {
    throw new LeadValidationError('Informe um nome válido.');
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim().toLowerCase())) {
    throw new LeadValidationError('Informe um e-mail válido.');
  }

  if (typeof interest !== 'string' || !allowedInterests.has(interest)) {
    throw new LeadValidationError('Selecione uma solução válida.');
  }

  const sanitized: LeadPayload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    interest,
  };

  if (typeof company === 'string' && company.trim()) {
    sanitized.company = company.trim();
  }

  if (typeof message === 'string' && message.trim()) {
    sanitized.message = message.trim();
  }

  if (typeof source === 'string' && source.trim()) {
    sanitized.source = source.trim();
  }

  return sanitized;
}

async function forwardToGateway(payload: LeadPayload, metadata: LeadMetadata): Promise<LeadGatewayResult> {
  const url = process.env.VPS_GATEWAY_URL;
  if (!url) {
    await recordLeadLifecycle({
      name: 'lead.gateway.skipped',
      severity: 'warn',
      context: { reason: 'missing_gateway_url', email: payload.email },
    });
    return {
      status: 'pending',
      message: 'Gateway não configurado. Persistência deve ser realizada manualmente.',
      payload,
    };
  }

  const requestBody = {
    lead: payload,
    metadata,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WM3-API-KEY': process.env.VPS_GATEWAY_KEY ?? '',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const responseText = await response.text();
      await recordLeadLifecycle({
        name: 'lead.gateway.failed',
        severity: 'error',
        context: { status: response.status, body: responseText },
      });
      return {
        status: 'failed',
        message: 'Falha ao persistir lead no gateway da WM3.',
        payload,
      };
    }

    await recordLeadLifecycle({
      name: 'lead.gateway.stored',
      severity: 'info',
      context: { status: response.status, email: payload.email },
    });

    return {
      status: 'stored',
      message: 'Lead persistido com sucesso no gateway WM3.',
      payload,
    };
  } catch (error) {
    await recordLeadLifecycle({
      name: 'lead.gateway.exception',
      severity: 'error',
      context: { error: String(error) },
    });

    return {
      status: 'failed',
      message: 'Erro de rede ao encaminhar lead para o gateway WM3.',
      payload,
    };
  }
}

export async function handleLeadSubmission(
  payload: unknown,
  metadata: LeadMetadata,
): Promise<LeadGatewayResult> {
  const sanitized = sanitizeLeadPayload(payload);

  await recordLeadLifecycle({
    name: 'lead.received',
    severity: 'info',
    context: {
      interest: sanitized.interest,
      origin: metadata.origin ?? 'unknown',
    },
  });

  const result = await forwardToGateway(sanitized, metadata);

  if (result.status !== 'stored') {
    await recordLeadLifecycle({
      name: 'lead.storage.pending',
      severity: 'warn',
      context: { status: result.status, email: sanitized.email },
    });
  }

  return result;
}
