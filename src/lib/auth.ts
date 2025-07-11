// src/lib/auth.ts
import { prisma } from "./prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

// ... (mantenha sua interface AuthUser como está)
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
  company: {
    id: string;
    name: string;
    slug: string;
    plan: string;
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  // ✅ CORREÇÃO: Adicionado 'await' para resolver a Promise de cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (!payload.userId || typeof payload.userId !== 'string') return null;

    const dbUser = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        company: {
          select: { id: true, name: true, slug: true, plan: true },
        },
      },
    });

    if (!dbUser) return null;

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
      companyId: dbUser.companyId,
      company: dbUser.company,
    };
  } catch (error) {
    console.error("Erro ao verificar JWT e buscar usuário:", error);
    return null;
  }
}