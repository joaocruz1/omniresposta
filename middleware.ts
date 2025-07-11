// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  // ✅ CORREÇÃO: A leitura do cookie é feita a partir do objeto `req`
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  let session = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      session = payload;
    } catch (err) {
      console.error("Token JWT inválido ou expirado");
    }
  }

  // Se o token for inválido, limpa o cookie
  const response = NextResponse.next();
  if (token && !session) {
    response.cookies.set("auth_token", "", { maxAge: -1 });
    if (!isPublicRoute) {
        // Redireciona para o login se o token era inválido e a rota não é pública
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return response;
  }

  // Redireciona para o login se não houver sessão e a rota for protegida
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redireciona para o dashboard se houver sessão e estiver acessando login/signup
  if (session && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};