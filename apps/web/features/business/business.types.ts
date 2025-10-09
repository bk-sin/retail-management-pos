import { CompanyConfig } from "@bksin/database";

export type CreateCompanyConfigDto = Omit<
  CompanyConfig,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateCompanyConfigDto = Partial<CreateCompanyConfigDto>;
