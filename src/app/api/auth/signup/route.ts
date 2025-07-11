// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Função para criar configurações padrão, movida para cá para ser usada localmente.
async function createDefaultSettings(companyId: string) {
    const defaultSettings = [
      { key: "ai_model", value: "GPT-4 Turbo", type: "string" },
      { key: "temperature", value: "0.7", type: "number" },
      { key: "max_tokens", value: "2048", type: "number" },
      { key: "auto_learn", value: "true", type: "boolean" },
      { key: "data_encryption", value: "true", type: "boolean" },
      { key: "audit_logs", value: "true", type: "boolean" },
      { key: "gdpr_compliance", value: "true", type: "boolean" },
      { key: "data_retention", value: "90", type: "number" },
      { key: "similarity_threshold", value: "0.8", type: "number" },
      { key: "vector_dimensions", value: "1536", type: "number" },
      { key: "auto_backup", value: "true", type: "boolean" },
      { key: "backup_frequency", value: "Diário", type: "string" },
      { key: "language", value: "Português (BR)", type: "string" },
      { key: "timezone", value: "America/Sao_Paulo", type: "string" },
      { key: "whatsapp_integration", value: "false", type: "boolean" },
      { key: "telegram_integration", value: "false", type: "boolean" },
      { key: "slack_integration", value: "false", type: "boolean" },
      { key: "webhook_integration", value: "false", type: "boolean" },
      { key: "webhook_url", value: "", type: "string" },
      { key: "notification_email", value: "", type: "string" },
      { key: "email_alerts", value: "true", type: "boolean" },
      { key: "system_alerts", value: "true", type: "boolean" },
      { key: "performance_reports", value: "true", type: "boolean" },
    ];

    await prisma.systemSetting.createMany({
      data: defaultSettings.map((setting) => ({
        companyId,
        settingKey: setting.key,
        settingValue: setting.value,
        settingType: setting.type,
      })),
    });
}


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // 1. Encontrar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      // Usamos uma mensagem genérica para não informar se o email existe ou não
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 } // 401 Unauthorized
      );
    }

    // 2. Comparar a senha enviada com a senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }
    
    // 3. Se a senha for válida, retorne os dados do usuário (sem a senha!)
    const { password: _, ...userWithoutPassword } = user;

    // A partir daqui, você pode gerar um token JWT ou criar uma sessão
    // Por enquanto, vamos apenas retornar o usuário para confirmar que o login funcionou
    return NextResponse.json({ user: userWithoutPassword });

  } catch (error) {
    console.error("Erro na API de signin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}