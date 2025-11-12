// Middleware de autenticação para proteger rotas
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

// Middleware para verificar autenticação
export function requireAuth(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      // Obter token do header Authorization ou cookie
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.replace('Bearer ', '') || 
                    req.cookies.get('auth_token')?.value;

      if (!token) {
        return NextResponse.json(
          { error: 'Não autorizado. Token não fornecido.' },
          { status: 401 }
        );
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: 'Não autorizado. Token inválido ou expirado.' },
          { status: 401 }
        );
      }

      // Adicionar usuário ao request
      (req as AuthenticatedRequest).user = payload;

      return handler(req as AuthenticatedRequest, context);
    } catch (error) {
      console.error('Erro no middleware de autenticação:', error);
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      );
    }
  };
}

// Middleware para verificar se é admin
export function requireAdmin(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return requireAuth(async (req: AuthenticatedRequest) => {
    if (req.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Acesso negado. Apenas administradores.' },
        { status: 403 }
      );
    }
    return handler(req);
  });
}

// Função auxiliar para obter token do request
export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  return authHeader?.replace('Bearer ', '') || 
         req.cookies.get('auth_token')?.value || 
         null;
}

