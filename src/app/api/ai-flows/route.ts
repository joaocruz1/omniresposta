import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const flows = await prisma.aIFlow.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(flows)
  } catch (error) {
    console.error("Erro ao buscar fluxos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const flow = await prisma.aIFlow.create({
      data: body,
    })

    return NextResponse.json(flow)
  } catch (error) {
    console.error("Erro ao criar fluxo:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
