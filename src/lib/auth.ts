import { supabase } from "./supabase"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs";

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  companyId: string
  company: {
    id: string
    name: string
    slug: string
    plan: string
  }
}

export async function signUp(email: string, password: string, companyName: string, userName: string) {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (!authData.user) throw new Error("Erro ao criar usuário")

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
    })

    // 3. Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        name: userName,
        role: "admin",
        companyId: company.id,
      },
    })

    // 4. Criar configurações padrão da empresa
    await createDefaultSettings(company.id)

    return { user, company }
  } catch (error) {
    console.error("Erro no signup:", error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Chamar a nossa nova rota de API
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Se a resposta da API não for OK (ex: status 401 ou 500), jogue um erro
    if (!response.ok) {
      throw new Error(data.error || 'Falha no login');
    }

    // Retorna os dados do usuário que a API enviou
    return data;
  } catch (error) {
    console.error("Erro no signIn do cliente:", error);
    // Propaga o erro para que o formulário possa exibi-lo
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            plan: true,
          },
        },
      },
    })

    if (!dbUser) return null

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
      companyId: dbUser.companyId,
      company: dbUser.company,
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return null
  }
}

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
  ]

  await prisma.systemSetting.createMany({
    data: defaultSettings.map((setting) => ({
      companyId,
      settingKey: setting.key,
      settingValue: setting.value,
      settingType: setting.type,
    })),
  })
}
