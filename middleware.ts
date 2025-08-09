// src/middleware.ts ou middleware.js
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Defina as rotas que não precisam de autenticação
const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    // Se o utilizador tentar aceder a uma rota pública, permita o acesso
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Se não houver um cookie de sessão, redirecione para a página de login
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Se houver um cookie de sessão e a rota não for pública, permita o acesso
    return NextResponse.next();
}

// O matcher define a quais rotas este middleware será aplicado
export const config = {
    // Aplica o middleware a todas as rotas, exceto as internas do Next.js e ficheiros estáticos
    matcher: ["/((?!_next|favicon.ico).*)"],
};