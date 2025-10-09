import BusinessOnboardingForm from "@/components/onboarding/onboarding-form";
import { getCompanyConfigServer } from "@/features/business/business.server";
import { redirect } from "next/navigation";

const BusinessOnboardingPage = async () => {
  const companyConfigs = await getCompanyConfigServer();

  if (companyConfigs && companyConfigs.length > 0) {
    redirect("/dashboard");
  }

  return <BusinessOnboardingForm />;
};

export default BusinessOnboardingPage;
