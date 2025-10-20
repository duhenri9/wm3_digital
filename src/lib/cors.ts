import { NextRequest, NextResponse } from 'next/server';

export interface CorsConfig {
  origins: string[];
  methods: string[];
  headers?: string[];
}

interface CorsResult {
  origin: string;
}

const DEFAULT_ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'Accept',
];

export function resolveAllowedOrigin(request: NextRequest, origins: string[]): string | null {
  const requestOrigin = request.headers.get('origin');
  if (!requestOrigin) return null;

  if (origins.includes(requestOrigin)) {
    return requestOrigin;
  }

  const localDevOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (localDevOrigin && requestOrigin === localDevOrigin) {
    return requestOrigin;
  }

  if (requestOrigin.startsWith('http://localhost')) {
    return requestOrigin;
  }

  return null;
}

export function handleCors(
  request: NextRequest,
  config: CorsConfig,
): { response: NextResponse | null; result: CorsResult | null } {
  const allowedOrigin = resolveAllowedOrigin(request, config.origins);

  if (request.method === 'OPTIONS') {
    if (!allowedOrigin) {
      return {
        response: NextResponse.json({ error: 'Origin not permitted' }, { status: 403 }),
        result: null,
      };
    }

    const response = new NextResponse(null, { status: 204 });
    appendCorsHeaders(response, allowedOrigin, config);
    response.headers.set('Content-Length', '0');
    return { response, result: null };
  }

  if (!allowedOrigin) {
    return {
      response: NextResponse.json({ error: 'Origin not permitted' }, { status: 403 }),
      result: null,
    };
  }

  return { response: null, result: { origin: allowedOrigin } };
}

export function appendCorsHeaders(
  response: NextResponse,
  origin: string,
  config: CorsConfig,
): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', config.methods.join(','));
  response.headers.set(
    'Access-Control-Allow-Headers',
    (config.headers ?? DEFAULT_ALLOWED_HEADERS).join(','),
  );
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Vary', 'Origin');
  return response;
}
