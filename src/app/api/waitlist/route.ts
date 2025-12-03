import { NextRequest, NextResponse } from 'next/server';

interface WaitlistRequest {
  projectId: string;
  projectName: string;
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.projectName) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Save to database (Supabase, PostgreSQL, etc.)
    // 2. Send email notification to financeiro@wm3digital.com.br
    // 3. Send confirmation email to the user

    // Example email content that would be sent:
    const emailContent = {
      to: 'financeiro@wm3digital.com.br',
      subject: `Nova inscrição na lista de espera: ${body.projectName}`,
      html: `
        <h2>Nova Inscrição - Lista de Espera</h2>
        <p><strong>Projeto:</strong> ${body.projectName}</p>
        <p><strong>Nome:</strong> ${body.name}</p>
        <p><strong>E-mail:</strong> ${body.email}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `
    };

    // Log for now (replace with actual email service)
    console.log('Waiting list registration:', emailContent);

    // Here you would integrate with:
    // - Resend, SendGrid, AWS SES, or similar email service
    // - Database to store the registration

    // Example with Resend (commented out):
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'notifications@wm3digital.com.br',
      to: 'financeiro@wm3digital.com.br',
      subject: emailContent.subject,
      html: emailContent.html,
    });
    */

    return NextResponse.json({
      success: true,
      message: 'Cadastro realizado com sucesso'
    });

  } catch (error) {
    console.error('Error processing waitlist registration:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar cadastro. Tente novamente.' },
      { status: 500 }
    );
  }
}
