import { CompanyConfig } from "@bksin/database";
import { cookies } from "next/headers";

export async function getCompanyConfigServer(): Promise<CompanyConfig[]> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  if (!authToken) {
    return [];
  }

  const apiUrl = process.env.API_URL || "http://localhost:4000";

  try {
    const response = await fetch(`${apiUrl}/business`, {
      headers: {
        Cookie: `auth_token=${authToken.value}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch business config: ${response.statusText}`);
      return [];
    }

    const configs: CompanyConfig[] = await response.json();
    return configs;
  } catch (error) {
    console.error("Error fetching business config:", error);
    return [];
  }
}
