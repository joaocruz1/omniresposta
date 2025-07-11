import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

/**
 * @swagger
 * /api/auth/me:
 * get:
 * summary: Obtém os dados do usuário autenticado
 * description: Verifica o token de autenticação a partir dos cookies e retorna as informações do usuário logado, incluindo detalhes da empresa.
 * tags:
 * - Autenticação
 * responses:
 * 200:
 * description: Sucesso. Retorna o objeto do usuário.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: string
 * email:
 * type: string
 * name:
 * type: string
 * role:
 * type: string
 * companyId:
 * type: string
 * company:
 * type: object
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 * slug:
 * type: string
 * plan:
 * type: string
 * 401:
 * description: Não autorizado. Ocorre se o token não for encontrado, for inválido ou o usuário não existir.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * example: "Não autorizado"
 */
export async function GET() {
  try {
    // A função getCurrentUser já faz todo o trabalho de ler o cookie,
    // verificar o JWT e buscar o usuário no banco de dados.
    const user = await getCurrentUser();

    // Se a função não retornar um usuário, significa que o token é inválido ou não existe.
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Retorna os dados do usuário em formato JSON.
    return NextResponse.json(user);
    
  } catch (error) {
    console.error("Erro inesperado na rota /api/auth/me:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}