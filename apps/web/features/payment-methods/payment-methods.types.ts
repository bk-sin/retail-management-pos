import { PaymentMethod } from "@bksin/database";

export type CreatePaymentMethodDto = Omit<
  PaymentMethod,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdatePaymentMethodDto = Partial<CreatePaymentMethodDto>;
