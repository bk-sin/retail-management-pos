import { LoginForm } from "@/components/auth/login-form";
import { getUserPayload } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const userPayload = await getUserPayload();

  if (userPayload) {
    redirect("/");
  }
  return <LoginForm />;
}
