import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const companyId = user.companyId
    const today = new Date()
    today.setHours(0, 0, 0, 0)

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
      // Total de conversas da empresa
      prisma.conversation.count({
        where: { companyId },
      }),

      // Conversas de hoje da empresa
      prisma.conversation.count({
        where: {
          companyId,
          createdAt: {
            gte: today,
          },
        },
      }),

      // Conversas resolvidas da empresa
      prisma.conversation.count({
        where: {
          companyId,
          resolved: true,
        },
      }),

      // Fluxos ativos da empresa
      prisma.aIFlow.count({
        where: {
          companyId,
          status: "Ativo",
        },
      }),

      // Total de documentos da empresa
      prisma.document.count({
        where: { companyId },
      }),

      // Documentos com vetores da empresa
      prisma.document.findMany({
        where: { companyId },
        select: {
          vectors: true,
        },
      }),

      // Dados de tempo de resposta da empresa
      prisma.conversation.findMany({
        where: {
          companyId,
          responseTime: {
            not: null,
          },
        },
        select: {
          responseTime: true,
        },
      }),

      // Dados de satisfação da empresa
      prisma.conversation.findMany({
        where: {
          companyId,
          satisfactionScore: {
            not: null,
          },
        },
        select: {
          satisfactionScore: true,
        },
      }),
    ])

    // Calcular estatísticas derivadas
    const vectorsGenerated = documentsWithVectors.reduce((sum, doc) => sum + (doc.vectors || 0), 0)

    const averageTime = responseTimeData.length
      ? (
          responseTimeData.reduce((sum, conv) => sum + (conv.responseTime || 0), 0) /
          responseTimeData.length /
          60
        ).toFixed(1)
      : "0"

    const satisfaction = satisfactionData.length
      ? satisfactionData.reduce((sum, conv) => sum + (conv.satisfactionScore || 0), 0) / satisfactionData.length
      : 0

    const resolutionRate = totalConversations ? (resolvedConversations / totalConversations) * 100 : 0

    const stats = {
      totalConversations,
      conversationsToday,
      resolutionRate: Number(resolutionRate.toFixed(1)),
      averageTime: `${averageTime}min`,
      satisfaction: Number(satisfaction.toFixed(1)),
      activeFlows,
      totalDocuments,
      vectorsGenerated,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
