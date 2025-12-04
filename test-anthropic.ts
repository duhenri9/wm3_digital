#!/usr/bin/env tsx
/**
 * Teste simples da API Key da Anthropic
 * Executa: npx tsx test-anthropic.ts
 */

// Carregar variáveis de ambiente do .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '.env.local') });

import Anthropic from '@anthropic-ai/sdk';

async function testAnthropic() {
  console.log('\n🧪 Testando conexão com Anthropic Claude...\n');

  // Verificar se API Key está configurada
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ERRO: ANTHROPIC_API_KEY não encontrada no .env.local');
    console.log('\nVerifique se o arquivo .env.local contém:');
    console.log('ANTHROPIC_API_KEY=sk-ant-api03-...\n');
    process.exit(1);
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    console.log('📡 Enviando requisição para Claude Sonnet 4.5...\n');

    const startTime = Date.now();

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Responda apenas com: "API funcionando! WM3 Digital pronta para gerar conteúdo de qualidade."',
        },
      ],
    });

    const duration = Date.now() - startTime;
    const response = message.content[0].type === 'text' ? message.content[0].text : '';

    console.log('✅ Resposta recebida:\n');
    console.log(`   ${response}\n`);
    console.log('📊 Métricas:');
    console.log(`   Modelo: ${message.model}`);
    console.log(`   Tokens input: ${message.usage.input_tokens}`);
    console.log(`   Tokens output: ${message.usage.output_tokens}`);
    console.log(`   Duração: ${duration}ms`);
    console.log(`   Custo estimado: R$ ${calculateCost(message.usage.input_tokens, message.usage.output_tokens).toFixed(4)}\n`);

    console.log('🎉 Teste concluído com sucesso!');
    console.log('   A integração com Claude está funcionando.\n');
    console.log('👉 Próximo passo: Testar o endpoint completo do Tema 360');
    console.log('   curl -X POST http://localhost:3002/api/ai/tema-360/generate \\');
    console.log('     -H "Content-Type: application/json" \\');
    console.log('     -d \'{"tema":"Como validar SaaS","publico":"Founders","tom":"Pragmático"}\'\n');

  } catch (error: unknown) {
    console.error('\n❌ Erro ao conectar com Anthropic:\n');

    const err = error as { status?: number; message?: string };

    if (err.status === 401) {
      console.error('   Erro 401: API Key inválida ou expirada');
      console.error('   Verifique se a chave no .env.local está correta.\n');
    } else if (err.status === 429) {
      console.error('   Erro 429: Rate limit atingido');
      console.error('   Aguarde alguns minutos antes de tentar novamente.\n');
    } else {
      console.error(`   ${(err && err.message) || 'Erro desconhecido'}\n`);
    }

    process.exit(1);
  }
}

function calculateCost(inputTokens: number, outputTokens: number): number {
  const USD_TO_BRL = 5.0;
  const SONNET_COSTS = {
    input: 3.0, // USD per 1M tokens
    output: 15.0, // USD per 1M tokens
  };

  const inputCost = (inputTokens / 1_000_000) * SONNET_COSTS.input;
  const outputCost = (outputTokens / 1_000_000) * SONNET_COSTS.output;

  return (inputCost + outputCost) * USD_TO_BRL;
}

testAnthropic();
