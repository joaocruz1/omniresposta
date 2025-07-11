// src/app/api/auth/signout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // ✅ CORREÇÃO: Criar uma resposta e remover o cookie nela
    const response = NextResponse.json({ message: "Logout bem-sucedido" });
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: -1,
    });

    return response;
  } catch (error) {
    console.error("Erro na API de signout:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}