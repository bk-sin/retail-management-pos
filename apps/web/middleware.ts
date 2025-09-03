import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not set in environment variables!");
  }
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, getJwtSecretKey());

    return NextResponse.next();
  } catch (error) {
    console.error("Token validation failed:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    response.cookies.delete("user_info");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Aplica el middleware a todas estas rutas,
     * pero excluye las de la API, archivos estáticos, etc.
     */
    "/",
    "/dashboard/:path*",
    "/profile",
  ],
};
