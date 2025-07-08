// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

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
    const { email, password, companyName, name } = await request.json();

    if (!email || !password || !companyName || !name) {
        return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
        // Retorna um erro mais específico se o usuário já existir
        if (authError.message.includes("User already registered")) {
            return NextResponse.json({ error: "Este email já está cadastrado." }, { status: 409 });
        }
        throw authError;
    }

    if (!authData.user) {
      throw new Error("Erro ao criar usuário no Supabase");
    }

    // 2. Criar empresa no banco
    const company = await prisma.company.create({
      data: {
        name: companyName,
        email,
        slug: companyName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      },
    });

    // 3. Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        name: name,
        role: "admin",
        companyId: company.id,
      },
    });

    // 4. Criar configurações padrão da empresa
    await createDefaultSettings(company.id);

    // Retorna os dados do usuário e da empresa, junto com a sessão do Supabase se necessário
    return NextResponse.json({ user, company, session: authData.session });

  } catch (error: any) {
    console.error("Erro na API de signup:", error);
    // Retorna a mensagem de erro específica se disponível, senão uma genérica
    const errorMessage = error.error_description || error.message || "Erro interno do servidor";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}