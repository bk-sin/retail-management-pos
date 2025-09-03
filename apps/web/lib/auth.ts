"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { loginFormSchema } from "@/schemas/login-schema";

const API_BASE_URL = process.env.API_URL || "http://localhost:4000";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = loginFormSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || "Login failed",
      };
    }

    const data = await response.json();

    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    if (data.user) {
      cookieStore.set("user_info", JSON.stringify(data.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Network error or server unavailable",
    };
  }

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_info");
  redirect("/login");
}
