import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USER ?? 'financeiro@wm3digital.com.br';
const ADMIN_PASS = process.env.ADMIN_PASS ?? 'sup@2026UP';

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="WM3 Admin"' },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin/costs')) {
    return NextResponse.next();
  }

  const header = req.headers.get('authorization');
  if (!header?.startsWith('Basic ')) {
    return unauthorized();
  }

  const decoded = Buffer.from(header.replace('Basic ', ''), 'base64').toString();
  const [user, pass] = decoded.split(':');
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/costs'],
};
