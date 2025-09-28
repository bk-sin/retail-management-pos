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
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, getJwtSecretKey());

    if (pathname.startsWith("/onboarding")) {
      return NextResponse.next();
    }

    const configChecked = request.cookies.get("config_checked")?.value;

    if (!configChecked) {
      try {
        const response = await fetch(`${process.env.API_URL}/company-config`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok || response.status === 404) {
          return NextResponse.redirect(new URL("/onboarding", request.url));
        }

        const nextResponse = NextResponse.next();
        nextResponse.cookies.set("config_checked", "true", {
          maxAge: 300,
          httpOnly: true,
        });
        return nextResponse;
      } catch (error) {
        console.error("Error checking business config:", error);
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token validation failed:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    response.cookies.delete("user_info");
    response.cookies.delete("config_checked");
    return response;
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile", "/onboarding"],
};
