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
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const channel = searchParams.get("channel")
    const status = searchParams.get("status")

    const where: any = {
      companyId: user.companyId,
    }

    if (channel) {
      where.channel = channel
    }

    if (status) {
      where.status = status
    }

    const conversations = await prisma.conversation.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Erro ao buscar conversas:", error)
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

    const conversation = await prisma.conversation.create({
      data: {
        ...body,
        companyId: user.companyId,
      },
    })

    return NextResponse.json(conversation)
  } catch (error) {
    console.error("Erro ao criar conversa:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
