import { getCompanyConfigServer } from "@/features/business/business.server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const companyConfigs = await getCompanyConfigServer();

  if (!companyConfigs || companyConfigs.length === 0) {
    redirect("/onboarding");
  }

  const config = companyConfigs[0];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Bienvenido</h2>
            <p className="text-muted-foreground">
              Configuración del negocio completada
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Empresa</h2>
            <p className="text-muted-foreground">{config?.legalName}</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">CUIT</h2>
            <p className="text-muted-foreground">{config?.cuit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
