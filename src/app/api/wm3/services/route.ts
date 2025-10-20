import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { appendCorsHeaders, handleCors, type CorsConfig } from '@/lib/cors';
import type { SaaSWebhookPayload } from '@/lib/contracts';
import { recordSyncEvent } from '@/lib/observability';
import { listServiceSnapshot, updateServiceSnapshot } from '@/lib/service-cache';

const corsConfig: CorsConfig = {
  origins: ['https://wm3digital.com', 'https://app.wm3digital.com'],
  methods: ['POST', 'OPTIONS'],
  headers: ['Content-Type', 'X-WM3-SIGNATURE', 'X-WM3-API-KEY'],
};

export async function GET() {
  const snapshot = listServiceSnapshot();
  return NextResponse.json(snapshot, { status: 200 });
}

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
  const providedSecret =
    request.headers.get('x-wm3-signature') ?? request.headers.get('x-wm3-api-key');
  const expectedSecret = process.env.WM3_API_SECRET;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    const response = NextResponse.json({ error: 'Unauthorized webhook request.' }, { status: 401 });
    return appendCorsHeaders(response, origin, corsConfig);
  }

  let payload: SaaSWebhookPayload;
  try {
    payload = await request.json();
  } catch (error) {
    await recordSyncEvent({
      name: 'services.snapshot.invalid-payload',
      severity: 'warn',
      context: { error: String(error) },
    });
    const response = NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
    return appendCorsHeaders(response, origin, corsConfig);
  }

  const updates = payload.services ?? [];
  const snapshot = updateServiceSnapshot(updates, { source: 'webhook' });

  await recordSyncEvent({
    name: 'services.snapshot.updated',
    severity: 'info',
    context: {
      updated: updates.length,
      source: payload.source ?? 'webhook',
      triggeredAt: payload.triggeredAt ?? new Date().toISOString(),
    },
  });

  revalidatePath('/');
  revalidatePath('/servicos');

  const response = NextResponse.json(
    {
      status: 'accepted',
      updatedAt: snapshot.updatedAt,
      services: snapshot.services,
    },
    { status: 202 },
  );

  return appendCorsHeaders(response, origin, corsConfig);
}
