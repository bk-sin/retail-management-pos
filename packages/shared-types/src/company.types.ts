import type { CompanyConfig } from "@bksin/database";

/**
 * @description DTO para actualizar la configuración de la empresa.
 * Omitimos los campos que no deben ser actualizables por el cliente, como 'id' o 'createdAt'.
 */
export type UpdateCompanyConfigDto = Partial<
  Omit<CompanyConfig, "id" | "createdAt" | "updatedAt">
>;

export type CreateBusinessDto = Partial<
  Omit<CompanyConfig, "id" | "createdAt" | "updatedAt">
>;
