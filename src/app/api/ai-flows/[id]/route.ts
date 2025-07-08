import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const flowId = Number.parseInt(params.id)

    const flow = await prisma.aIFlow.update({
      where: { id: flowId },
      data: body,
    })

    return NextResponse.json(flow)
  } catch (error) {
    console.error("Erro ao atualizar fluxo:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const flowId = Number.parseInt(params.id)

    await prisma.aIFlow.delete({
      where: { id: flowId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar fluxo:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
