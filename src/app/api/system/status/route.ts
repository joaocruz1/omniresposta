import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Simular verificação de status dos serviços
    // Em um ambiente real, você faria verificações reais dos serviços
    const services = [
      {
        service: "API Principal",
        status: "Online",
        uptime: "99.9%",
        response: `${Math.floor(Math.random() * 50) + 20}ms`,
        lastCheck: new Date().toISOString(),
      },
      {
        service: "Banco Vetorial",
        status: "Online",
        uptime: "99.8%",
        response: `${Math.floor(Math.random() * 20) + 5}ms`,
        lastCheck: new Date().toISOString(),
      },
      {
        service: "Processamento IA",
        status: Math.random() > 0.1 ? "Online" : "Degradado",
        uptime: "99.7%",
        response: `${Math.floor(Math.random() * 300) + 100}ms`,
        lastCheck: new Date().toISOString(),
      },
      {
        service: "WebSocket",
        status: Math.random() > 0.05 ? "Online" : "Degradado",
        uptime: "98.2%",
        response: `${Math.floor(Math.random() * 100) + 50}ms`,
        lastCheck: new Date().toISOString(),
      },
      {
        service: "Cache Redis",
        status: "Online",
        uptime: "100%",
        response: `${Math.floor(Math.random() * 5) + 1}ms`,
        lastCheck: new Date().toISOString(),
      },
    ]

    // Buscar métricas recentes da empresa
    const recentMetrics = await prisma.systemMetric.findMany({
      where: {
        companyId: user.companyId,
        recordedAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // Últimos 5 minutos
        },
      },
      orderBy: {
        recordedAt: "desc",
      },
      take: 20,
    })

    // Calcular estatísticas de sistema
    const systemStats = {
      totalServices: services.length,
      onlineServices: services.filter((s) => s.status === "Online").length,
      degradedServices: services.filter((s) => s.status === "Degradado").length,
      offlineServices: services.filter((s) => s.status === "Offline").length,
      averageResponseTime:
        services.reduce((acc, service) => {
          return acc + Number.parseInt(service.response.replace("ms", ""))
        }, 0) / services.length,
      overallUptime:
        services.reduce((acc, service) => {
          return acc + Number.parseFloat(service.uptime.replace("%", ""))
        }, 0) / services.length,
    }

    return NextResponse.json({
      services,
      systemStats,
      recentMetrics,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro ao buscar status do sistema:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
