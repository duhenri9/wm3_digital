/**
 * API Route: Health Check
 * GET /api/health
 *
 * Retorna status do sistema e serviços AI
 */

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const services = [
    {
      name: 'Tema 360',
      endpoint: '/api/ai/tema-360/generate',
      status: 'operational',
      model: 'claude-sonnet-4-5',
    },
    {
      name: 'Raio-X Landing',
      endpoint: '/api/ai/raio-x-landing/analyze',
      status: 'operational',
      model: 'claude-sonnet-4-5',
    },
    {
      name: 'Brand Snapshot',
      endpoint: '/api/ai/brand-snapshot/generate',
      status: 'operational',
      model: 'claude-sonnet-4-5 + imagen-3',
    },
    {
      name: 'Landing Blueprint',
      endpoint: '/api/ai/landing-blueprint/generate',
      status: 'operational',
      model: 'claude-sonnet-4-5',
    },
    {
      name: 'QR Code Hero',
      endpoint: '/api/ai/qr-code-hero/generate',
      status: 'operational',
      model: 'claude-sonnet-4-5 + imagen-3',
    },
  ];

  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      total: services.length,
      operational: services.filter((s) => s.status === 'operational').length,
      list: services,
    },
    security: {
      apiKeyAuth: !!process.env.WM3_API_KEYS,
      rateLimiter: 'active',
      costMonitor: 'active',
      circuitBreaker: 'active',
    },
    integrations: {
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      googleAI: !!process.env.GOOGLE_AI_API_KEY,
      vertexAI: !!(
        process.env.GOOGLE_CLOUD_PROJECT && process.env.GOOGLE_CLOUD_LOCATION
      ),
    },
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Health-Check-Version': '1.0.0',
    },
  });
}
