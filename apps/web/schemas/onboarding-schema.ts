import { IVA_CONDITIONS } from "@/constants/onboarding-mock";
import { z } from "zod";

const isValidCuit = (cuit: string) => {
  if (typeof cuit !== "string" || cuit.length !== 13) return false;
  const [type, body, verifier] = cuit.split("-");
  if (
    !type ||
    !body ||
    !verifier ||
    type.length !== 2 ||
    body.length !== 8 ||
    verifier.length !== 1
  )
    return false;

  const cuitNumbers = (type + body).split("").map(Number);
  const series = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cuitNumbers[i] * series[i];
  }
  const rest = sum % 11;
  const digit = rest === 0 ? 0 : 11 - rest === 10 ? 9 : 11 - rest;

  return parseInt(verifier) === digit;
};

export const stepOneSchema = z.object({
  legalName: z.string().min(3, { message: "La razón social es obligatoria." }),
  cuit: z
    .string()
    .regex(/^\d{2}-\d{8}-\d{1}$/, "El formato debe ser XX-XXXXXXXX-X.")
    .refine(isValidCuit, { message: "El CUIT no es válido." }),
  ivaCondition: z.enum(
    IVA_CONDITIONS.map((cond) => cond.id),
    {
      message: "Debes seleccionar una condición de IVA.",
    }
  ),
});

export const stepTwoSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .min(8, { message: "El teléfono debe tener al menos 8 dígitos." }),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  email: z.string().email({ message: "El email no es válido." }),
  website: z
    .string()
    .url({ message: "La URL no es válida." })
    .optional()
    .or(z.literal("")),
});

export const stepThreeSchema = z.object({
  selectedTaxes: z
    .array(z.number())
    .min(1, { message: "Debes seleccionar al menos un impuesto." }),
});

export const stepFourSchema = z.object({
  selectedPaymentMethods: z
    .array(z.number())
    .min(1, { message: "Debes seleccionar al menos un método de pago." }),
});

export const onboardingSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema);

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
export type OnboardingStep1FormData = z.infer<typeof stepOneSchema>;
export type OnboardingStep2FormData = z.infer<typeof stepTwoSchema>;
export type OnboardingStep3FormData = z.infer<typeof stepThreeSchema>;
export type OnboardingStep4FormData = z.infer<typeof stepFourSchema>;
