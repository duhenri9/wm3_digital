import { NextRequest, NextResponse } from 'next/server';

interface SeoBlogWaitlistRequest {
  name: string;
  segment: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SeoBlogWaitlistRequest = await request.json();

    if (!body.name?.trim() || !body.segment?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { success: false, error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    const emailContent = {
      to: 'financeiro@wm3digital.com.br',
      subject: 'Novo lead – Waiting List SEO Blog',
      html: `
        <h2>Nova inscrição - SEO Blog</h2>
        <p><strong>Nome:</strong> ${body.name}</p>
        <p><strong>Segmento:</strong> ${body.segment}</p>
        <p><strong>E-mail:</strong> ${body.email}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `,
    };

    // TODO: Integrar provedor de e-mail (Resend/SES/SendGrid). Por enquanto logamos.
    console.log('[SEO Blog Waitlist] Lead recebido:', emailContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[SEO Blog Waitlist] Erro:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar cadastro. Tente novamente.' },
      { status: 500 }
    );
  }
}
