import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.companyId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("timeRange") || "7d";

    // Calcular data de início baseada no timeRange
    const now = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case "24h":
        startDate.setHours(now.getHours() - 24);
        break;
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
    }

    // Buscar conversas no período da empresa
    const conversationsData = await prisma.conversation.findMany({
      where: {
        companyId: user.companyId,
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
        resolved: true,
        satisfactionScore: true,
        channel: true,
        query: true,
        status: true,
        userId: true,
      },
    });

    // Buscar interações recentes da empresa
    const recentInteractions = await prisma.conversation.findMany({
      where: {
        companyId: user.companyId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        userId: true,
        query: true,
        status: true,
        createdAt: true,
      },
    });

    // Processar dados para gráficos
    // ✅ CORREÇÃO: Adicionada a tipagem explícita para o acumulador (acc).
    const channelStats = conversationsData.reduce(
      (acc: { [key: string]: number }, conv) => {
        const channel = conv.channel || "Desconhecido";
        acc[channel] = (acc[channel] || 0) + 1;
        return acc;
      },
      {}
    );

    // Agora `conversas` é corretamente inferido como `number`.
    const channelData = Object.entries(channelStats).map(
      ([canal, conversas]) => ({
        canal,
        conversas,
        crescimento: Math.floor(Math.random() * 20) - 5, // Simulado
      })
    );

    // Análise de perguntas mais frequentes
    // ✅ CORREÇÃO: Adicionada a tipagem explícita para o acumulador (acc).
    const queryAnalysis = conversationsData.reduce(
      (acc: { [key: string]: number }, conv) => {
        const query = conv.query?.toLowerCase() || "";

        // Categorizar perguntas (lógica simples)
        let category = "Geral";
        if (query.includes("pedido") || query.includes("compra"))
          category = "Vendas";
        if (query.includes("entrega") || query.includes("rastrear"))
          category = "Logística";
        if (query.includes("problema") || query.includes("erro"))
          category = "Suporte";
        if (query.includes("pagamento") || query.includes("cobrança"))
          category = "Financeiro";

        const key = `${category}:${conv.query?.substring(0, 50) || ""}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {}
    );

    const topQuestions = Object.entries(queryAnalysis)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([key, count]) => {
        const [category, question] = key.split(":");
        return { question, count, category };
      });

    // Dados de performance por hora (últimas 24h)
    const hourlyData = [];
    for (let i = 23; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourEnd = new Date(hourStart.getTime() + 60 * 60 * 1000);

      const hourConversations = conversationsData.filter(
        (conv) =>
          new Date(conv.createdAt) >= hourStart &&
          new Date(conv.createdAt) < hourEnd
      );

      const satisfactionScores = hourConversations
        .map((conv) => conv.satisfactionScore)
        .filter((score): score is number => score !== null);

      hourlyData.push({
        hour: hourStart.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        conversas: hourConversations.length,
        resolvidas: hourConversations.filter((conv) => conv.resolved).length,
        satisfacao:
          satisfactionScores.length > 0
            ? satisfactionScores.reduce((sum, score) => sum + score, 0) /
              satisfactionScores.length
            : 0,
      });
    }
    
    const totalSatisfactionScores = conversationsData
        .map(conv => conv.satisfactionScore)
        .filter((score): score is number => score !== null);


    return NextResponse.json({
      conversationsData: hourlyData,
      channelData,
      topQuestions,
      recentInteractions: recentInteractions.map((interaction) => ({
        id: interaction.id,
        user: `Cliente #${interaction.userId.substring(0, 8)}`,
        query:
          interaction.query.length > 50
            ? interaction.query.substring(0, 50) + "..."
            : interaction.query,
        status: interaction.status,
        time: new Date(interaction.createdAt).toLocaleString("pt-BR"),
      })),
      summary: {
        totalConversations: conversationsData.length,
        resolvedConversations: conversationsData.filter((conv) => conv.resolved)
          .length,
        averageSatisfaction:
          totalSatisfactionScores.length > 0
            ? totalSatisfactionScores.reduce((sum, score) => sum + score, 0) /
              totalSatisfactionScores.length
            : 0,
        // ✅ CORREÇÃO: O sort agora funciona pois `conversas` é um número.
        // Adicionado spread `[...]` para não modificar o array original.
        topChannel:
          channelData.length > 0
            ? [...channelData].sort((a, b) => b.conversas - a.conversas)[0].canal
            : "N/A",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar analytics:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
