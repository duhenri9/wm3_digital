import { NextRequest, NextResponse } from 'next/server';
import type { PreviewRequest, PreviewResponse, Tema360Preview } from '@/types/ai-services';

export async function POST(request: NextRequest) {
  try {
    const body: PreviewRequest = await request.json();

    // Validate required inputs
    const { inputs } = body;
    if (!inputs.theme || typeof inputs.theme !== 'string') {
      return NextResponse.json<PreviewResponse<Tema360Preview>>(
        { success: false, error: 'Campo "tema" é obrigatório' },
        { status: 400 }
      );
    }

    // Generate AI preview (stubbed for now)
    const preview: Tema360Preview = {
      title: `${inputs.theme}: Guia Completo e Estratégico`,
      outline: [
        `Introdução ao ${inputs.theme}: contexto e relevância`,
        'Principais conceitos e fundamentos',
        'Aplicações práticas no mercado atual',
        'Casos de sucesso e exemplos reais',
        'Tendências e projeções futuras',
        'Como começar: primeiros passos práticos',
        'Conclusão e próximos passos'
      ],
      excerpt: `Descubra tudo sobre ${inputs.theme} neste guia completo. Aprenda os conceitos fundamentais, veja aplicações práticas no mercado e entenda como implementar em seu negócio. Um conteúdo estratégico para quem quer se destacar.`
    };

    // In a real implementation, you would:
    // 1. Call OpenAI API to generate the outline
    // 2. Generate the excerpt based on the theme
    // 3. Customize based on target audience and goals

    return NextResponse.json<PreviewResponse<Tema360Preview>>({
      success: true,
      preview
    });

  } catch (error) {
    console.error('Error generating Tema360 preview:', error);
    return NextResponse.json<PreviewResponse<Tema360Preview>>(
      { success: false, error: 'Erro ao gerar preview. Tente novamente.' },
      { status: 500 }
    );
  }
}
