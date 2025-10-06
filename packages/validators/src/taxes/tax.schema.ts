import { z } from "zod";
import { TAX_TYPE_VALUES } from "@bksin/constants";

export const taxSchema = z.object({
  name: z.string().min(1, { message: "Tax name is required" }).max(100),
  description: z.string().max(255).optional(),
  rate: z
    .number({ message: "Rate must be a number" })
    .min(0, { message: "Rate cannot be negative" })
    .max(1, { message: "Rate cannot exceed 100%" }),
  isActive: z.boolean().default(true),
  afipCode: z.string().optional(),
  taxType: z.enum(TAX_TYPE_VALUES),
});

export type TaxSchema = z.infer<typeof taxSchema>;
