import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/**
 * @swagger
 * /api/system/alerts:
 * get:
 * summary: Retorna os alertas de sistema para a empresa do usuário
 * description: Obtém uma lista de todos os alertas de sistema associados à empresa do usuário autenticado.
 * tags:
 * - Monitoramento
 * responses:
 * 200:
 * description: Lista de alertas retornada com sucesso.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: string
 * type:
 * type: string
 * message:
 * type: string
 * status:
 * type: string
 * createdAt:
 * type: string
 * format: date-time
 * 401:
 * description: Usuário não autenticado.
 * 500:
 * description: Erro interno do servidor.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const alerts = await prisma.systemAlert.findMany({
      where: {
        companyId: user.companyId,
      },
      orderBy: {
        createdAt: "desc", // Mostra os alertas mais recentes primeiro
      },
    });

    return NextResponse.json(alerts);

  } catch (error) {
    console.error("Erro ao buscar alertas do sistema:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}