// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ... (mantenha sua função createDefaultSettings como está)
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

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Este email já está em uso" }, { status: 409 });
    }

    const company = await prisma.company.create({
      data: {
        name: companyName,
        email,
        slug: companyName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "admin",
        companyId: company.id,
      },
    });

    await createDefaultSettings(company.id);

    const token = jwt.sign(
      { userId: user.id, email: user.email, companyId: user.companyId, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user;
    
    // ✅ CORREÇÃO: Criar a resposta e então setar o cookie
    const response = NextResponse.json({ user: userWithoutPassword });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;

  } catch (error) {
    console.error("Erro na API de signup:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}