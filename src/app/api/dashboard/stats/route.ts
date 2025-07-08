import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar estatísticas em paralelo para melhor performance
    const [
      totalConversations,
      conversationsToday,
      resolvedConversations,
      activeFlows,
      totalDocuments,
      documentsWithVectors,
      responseTimeData,
      satisfactionData,
    ] = await Promise.all([
      // Total de conversas
      prisma.conversation.count(),

      // Conversas de hoje
      prisma.conversation.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),

      // Conversas resolvidas
      prisma.conversation.count({
        where: {
          resolved: true,
        },
      }),

      // Fluxos ativos
      prisma.aIFlow.count({
        where: {
          status: "Ativo",
        },
      }),

      // Total de documentos
      prisma.document.count(),

      // Documentos com vetores
      prisma.document.findMany({
        select: {
          // Supondo que 'vectors' seja um campo numérico no seu schema
          vectors: true,
        },
      }),

      // Dados de tempo de resposta
      prisma.conversation.findMany({
        where: {
          responseTime: {
            not: null,
          },
        },
        select: {
          responseTime: true,
        },
      }),

      // Dados de satisfação
      prisma.conversation.findMany({
        where: {
          satisfactionScore: {
            not: null,
          },
        },
        select: {
          satisfactionScore: true,
        },
      }),
    ]);

    // Calcular estatísticas derivadas
    const vectorsGenerated = documentsWithVectors.reduce(
      // ✅ CORREÇÃO APLICADA AQUI
      (sum: number, doc: { vectors: number | null }) =>
        sum + (doc.vectors || 0),
      0
    );

    const averageTime = responseTimeData.length
      ? (
          responseTimeData.reduce(
            // ✅ CORREÇÃO APLICADA AQUI
            (sum: number, conv: { responseTime: number | null }) =>
              sum + (conv.responseTime || 0),
            0
          ) /
          responseTimeData.length /
          60
        ).toFixed(1)
      : "0";

    const satisfaction = satisfactionData.length
      ? satisfactionData.reduce(
          // ✅ CORREÇÃO APLICADA AQUI
          (sum: number, conv: { satisfactionScore: number | null }) =>
            sum + (conv.satisfactionScore || 0),
          0
        ) / satisfactionData.length
      : 0;

    const resolutionRate = totalConversations
      ? (resolvedConversations / totalConversations) * 100
      : 0;

    const stats = {
      totalConversations,
      conversationsToday,
      resolutionRate: Number(resolutionRate.toFixed(1)),
      averageTime: `${averageTime}min`,
      satisfaction: Number(satisfaction.toFixed(1)),
      activeFlows,
      totalDocuments,
      vectorsGenerated,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}