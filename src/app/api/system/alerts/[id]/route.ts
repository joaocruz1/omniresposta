import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const alertId = params.id

    const alert = await prisma.systemAlert.update({
      where: {
        id: alertId,
        companyId: user.companyId, // Garantir que só pode editar alertas da própria empresa
      },
      data: body,
    })

    return NextResponse.json(alert)
  } catch (error) {
    console.error("Erro ao atualizar alerta:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const alertId = params.id

    await prisma.systemAlert.delete({
      where: {
        id: alertId,
        companyId: user.companyId, // Garantir que só pode deletar alertas da própria empresa
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar alerta:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
