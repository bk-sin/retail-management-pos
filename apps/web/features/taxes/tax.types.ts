import { Tax } from "@bksin/database";

export type CreateTaxDto = Omit<Tax, "id" | "createdAt" | "updatedAt">;

export type UpdateTaxDto = Partial<CreateTaxDto>;
