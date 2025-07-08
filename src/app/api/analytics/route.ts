import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("timeRange") || "7d";

    // 1. Calcular as datas para o período atual e o anterior
    const now = new Date();
    const startDate = new Date();
    const previousStartDate = new Date();
    let intervalDays = 7;

    switch (timeRange) {
      case "24h":
        intervalDays = 1;
        startDate.setHours(now.getHours() - 24);
        previousStartDate.setHours(now.getHours() - 48);
        break;
      case "30d":
        intervalDays = 30;
        startDate.setDate(now.getDate() - 30);
        previousStartDate.setDate(now.getDate() - 60);
        break;
      case "7d":
      default:
        intervalDays = 7;
        startDate.setDate(now.getDate() - 7);
        previousStartDate.setDate(now.getDate() - 14);
        break;
    }

    // 2. Buscar todas as conversas dos dois períodos de uma vez para eficiência
    const conversationsData = await prisma.conversation.findMany({
      where: {
        createdAt: {
          gte: previousStartDate, // Pega desde o início do período anterior
        },
      },
      select: {
        createdAt: true,
        channel: true,
        query: true, // Incluído para analisar as perguntas
        // Outros campos que você possa precisar para estatísticas
      },
    });

    // 3. Processar dados para as estatísticas
    const channelStats = {
      current: {} as Record<string, number>,
      previous: {} as Record<string, number>,
    };
    
    const questionCounts: Record<string, number> = {};

    for (const conv of conversationsData) {
      const period = conv.createdAt >= startDate ? "current" : "previous";
      
      // Contar conversas por canal em cada período
      channelStats[period][conv.channel] = (channelStats[period][conv.channel] || 0) + 1;

      // Contar a frequência de cada 'query' apenas no período atual
      if (period === "current" && conv.query) {
         const normalizedQuery = conv.query.trim().toLowerCase();
         questionCounts[normalizedQuery] = (questionCounts[normalizedQuery] || 0) + 1;
      }
    }

    // Calcular crescimento e formatar dados do canal
    const allChannels = new Set([...Object.keys(channelStats.current), ...Object.keys(channelStats.previous)]);
    const channelData = Array.from(allChannels).map(channel => {
      const currentConversas = channelStats.current[channel] || 0;
      const previousConversas = channelStats.previous[channel] || 0;
      
      let crescimento = 0;
      if (previousConversas > 0) {
        crescimento = Math.round(((currentConversas - previousConversas) / previousConversas) * 100);
      } else if (currentConversas > 0) {
        crescimento = 100; // Crescimento "infinito" se saiu de 0 para >0
      }

      return {
        canal: channel,
        conversas: currentConversas,
        crescimento,
      };
    });

    // Formatar as perguntas mais frequentes
    const topQuestions = Object.entries(questionCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([question, count]) => ({
        question: question.charAt(0).toUpperCase() + question.slice(1), // Capitaliza a primeira letra
        count,
        // A categoria ainda precisaria de uma lógica mais complexa (ex: IA ou tags)
        category: "Não categorizado",
      }));


    // 4. Buscar interações recentes (esta query pode ser mantida separada)
    const recentInteractions = await prisma.conversation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      select: {
        id: true,
        userId: true,
        query: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      // Você pode retornar os dados brutos se precisar deles no front-end
      // conversationsData, 
      channelData,
      topQuestions,
      recentInteractions: recentInteractions.map((interaction: { id: string; userId: string; query: string | null; status: string; createdAt: Date }) => ({
        id: interaction.id,
        user: `Cliente #${interaction.userId}`,
        query: interaction.query,
        status: interaction.status,
        time: new Date(interaction.createdAt).toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      })),
    });

  } catch (error) {
    console.error("Erro ao buscar analytics:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}