import { NextRequest, NextResponse } from 'next/server';

import { appendCorsHeaders, handleCors, type CorsConfig } from '@/lib/cors';
import { handleLeadSubmission, LeadValidationError } from '@/lib/leads';
import { logIntegrationEvent } from '@/lib/observability';

const corsConfig: CorsConfig = {
  origins: ['https://wm3digital.com', 'https://app.wm3digital.com'],
  methods: ['POST', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
};

export async function OPTIONS(request: NextRequest) {
  const { response } = handleCors(request, corsConfig);
  return response ?? new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const cors = handleCors(request, corsConfig);
  if (cors.response) {
    return cors.response;
  }

  const origin = cors.result?.origin ?? request.headers.get('origin') ?? '';

  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    await logIntegrationEvent({
      name: 'lead.invalid-json',
      severity: 'warn',
      context: { error: String(error) },
    });
    const response = NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
    return appendCorsHeaders(response, origin, corsConfig);
  }

  try {
    const leadResult = await handleLeadSubmission(payload, {
      origin,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for'),
    });

    const response = NextResponse.json(
      {
        status: leadResult.status,
        message: leadResult.message,
      },
      { status: leadResult.status === 'stored' ? 201 : 202 },
    );

    return appendCorsHeaders(response, origin, corsConfig);
  } catch (error) {
    if (error instanceof LeadValidationError) {
      const response = NextResponse.json({ error: error.message }, { status: 422 });
      return appendCorsHeaders(response, origin, corsConfig);
    }

    await logIntegrationEvent({
      name: 'lead.unhandled-error',
      severity: 'error',
      context: { error: String(error) },
    });

    const response = NextResponse.json(
      { error: 'Erro interno ao processar o lead.' },
      { status: 500 },
    );
    return appendCorsHeaders(response, origin, corsConfig);
  }
}
