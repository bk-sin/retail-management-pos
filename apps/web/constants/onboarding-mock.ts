import {
  AdditionalInfoStep,
  AdditionalInfoStepProps,
} from "@/components/onboarding/steps/additional-info-step";
import {
  LegalInfoStep,
  LegalInfoStepProps,
} from "@/components/onboarding/steps/legal-info-step";
import {
  PaymentMethodStep,
  PaymentMethodStepProps,
} from "@/components/onboarding/steps/payment-method-step";
import { SummaryStep } from "@/components/onboarding/steps/summary-step";
import {
  TaxesStep,
  TaxesStepProps,
} from "@/components/onboarding/steps/taxes-step";
import { OnboardingFormData } from "@/schemas/onboarding-schema";
import {
  Building2,
  CheckCircle,
  CreditCard,
  FileText,
  Landmark,
} from "lucide-react";

export interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.FC<
    | LegalInfoStepProps
    | AdditionalInfoStepProps
    | TaxesStepProps
    | PaymentMethodStepProps
  >;
  fields?: (keyof OnboardingFormData)[];
}

export const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: 0,
    title: "Información Legal",
    description: "Datos legales de tu empresa.",
    icon: Building2,
    component: LegalInfoStep,
    fields: ["legalName", "cuit", "ivaCondition"],
  },
  {
    id: 1,
    title: "Información Adicional",
    description: "Detalles de contacto y ubicación.",
    icon: FileText,
    component: AdditionalInfoStep,
    fields: [
      "name",
      "phone",
      "address",
      "city",
      "province",
      "postalCode",
      "email",
      "website",
    ],
  },
  {
    id: 2,
    title: "Configuración de Impuestos",
    description: "Selecciona los impuestos aplicables.",
    icon: Landmark,
    component: TaxesStep,
    fields: ["selectedTaxes"],
  },
  {
    id: 3,
    title: "Métodos de Pago",
    description: "Configura las formas de pago.",
    icon: CreditCard,
    component: PaymentMethodStep,
    fields: ["selectedPaymentMethods"],
  },
  {
    id: 4,
    title: "Resumen",
    description: "Revisa y confirma tu configuración.",
    icon: CheckCircle,
    component: SummaryStep,
  },
];
