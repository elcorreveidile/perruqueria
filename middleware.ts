import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verificarToken } from "@/lib/auth-token";

// Protege /admin con la sesión de cookie firmada. Si las credenciales no
// están configuradas, deja pasar y las páginas muestran el aviso.
export async function middleware(request: NextRequest) {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  const valida = await verificarToken(request.cookies.get(COOKIE_NAME)?.value);
  const esLogin = request.nextUrl.pathname === "/admin/login";

  if (!valida && !esLogin) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }
  if (valida && esLogin) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    return NextResponse.redirect(adminUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
