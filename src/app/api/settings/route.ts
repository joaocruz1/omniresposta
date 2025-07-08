import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const settings = await prisma.systemSetting.findMany({
      where: {
        companyId: user.companyId,
      },
    })

    // Converter para objeto chave-valor
    const settingsObject = settings.reduce((acc: any, setting) => {
      let value: any = setting.settingValue

      // Converter tipos
      if (setting.settingType === "number") {
        value = Number.parseFloat(value)
      } else if (setting.settingType === "boolean") {
        value = value === "true"
      }

      acc[setting.settingKey] = value
      return acc
    }, {})

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error("Erro ao buscar configurações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()

    // Atualizar cada configuração usando upsert
    const updatePromises = Object.entries(body).map(([key, value]) =>
      prisma.systemSetting.upsert({
        where: {
          companyId_settingKey: {
            companyId: user.companyId,
            settingKey: key,
          },
        },
        update: {
          settingValue: String(value),
          settingType: typeof value,
          updatedAt: new Date(),
        },
        create: {
          companyId: user.companyId,
          settingKey: key,
          settingValue: String(value),
          settingType: typeof value,
        },
      }),
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar configurações:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
