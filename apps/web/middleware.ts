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

    const apiUrl = process.env.API_URL || "http://localhost:4000";

    try {
      const response = await fetch(`${apiUrl}/business`, {
        headers: {
          Cookie: `auth_token=${token}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const configs = await response.json();

        if (!configs || (Array.isArray(configs) && configs.length === 0)) {
          return NextResponse.redirect(new URL("/onboarding", request.url));
        }

        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    } catch (fetchError) {
      console.error("Error checking business config:", fetchError);
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    response.cookies.delete("user_info");
    return response;
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*", "/onboarding"],
};
