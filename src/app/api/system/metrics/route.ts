import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const metricName = searchParams.get("metric")
    const timeRange = searchParams.get("timeRange") || "24h"

    // Calcular data de início baseada no timeRange
    const now = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "1h":
        startDate.setHours(now.getHours() - 1)
        break
      case "24h":
        startDate.setHours(now.getHours() - 24)
        break
      case "7d":
        startDate.setDate(now.getDate() - 7)
        break
      case "30d":
        startDate.setDate(now.getDate() - 30)
        break
    }

    const where: any = {
      companyId: user.companyId,
      recordedAt: {
        gte: startDate,
      },
    }

    if (metricName) {
      where.metricName = metricName
    }

    const metrics = await prisma.systemMetric.findMany({
      where,
      orderBy: {
        recordedAt: "desc",
      },
      take: 100,
    })

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Erro ao buscar métricas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()

    const metric = await prisma.systemMetric.create({
      data: {
        ...body,
        companyId: user.companyId,
      },
    })

    return NextResponse.json(metric)
  } catch (error) {
    console.error("Erro ao criar métrica:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
