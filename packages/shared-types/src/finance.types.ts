import type { Tax, PaymentMethod } from "@bksin/database";

// --- Tipos para Impuestos (Tax) ---

/**
 * @description DTO para crear un nuevo impuesto.
 */
export type CreateTaxDto = Omit<Tax, "id" | "createdAt" | "updatedAt">;

/**
 * @description DTO para actualizar un impuesto. Todos los campos son opcionales.
 */
export type UpdateTaxDto = Partial<CreateTaxDto>;

// --- Tipos para Métodos de Pago (PaymentMethod) ---

/**
 * @description DTO para crear un nuevo método de pago.
 */
export type CreatePaymentMethodDto = Omit<
  PaymentMethod,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * @description DTO para actualizar un método de pago.
 */
export type UpdatePaymentMethodDto = Partial<CreatePaymentMethodDto>;
