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

export const TAXES = [
  {
    id: "1",
    name: "IVA 21%",
    description: "Impuesto al Valor Agregado",
    rate: 0.21,
    type: "PERCENTAGE",
    afipCode: "5",
    isActive: true,
    isDefault: true,
  },
  {
    id: "2",
    name: "IVA 10.5%",
    description: "IVA Reducido",
    rate: 0.105,
    type: "PERCENTAGE",
    afipCode: "4",
    isActive: true,
    isDefault: false,
  },
  {
    id: "3",
    name: "Percepción IIBB",
    description: "Percepción Ingresos Brutos",
    rate: 0.02,
    type: "PERCENTAGE",
    afipCode: "7",
    isActive: true,
    isDefault: false,
  },
];

export const PAYMENT_METHODS = [
  {
    id: "1",
    name: "Efectivo",
    description: "Pago en efectivo",
    type: "CASH",
    isActive: true,
    isDefault: true,
    requiresAuth: false,
    processingFee: null,
    feeType: null,
  },
  {
    id: "2",
    name: "Tarjeta de Crédito",
    description: "Visa, Mastercard, etc.",
    type: "CREDIT_CARD",
    isActive: true,
    isDefault: false,
    requiresAuth: true,
    processingFee: 0.035,
    feeType: "PERCENTAGE",
  },
  {
    id: "3",
    name: "Transferencia Bancaria",
    description: "Transferencia electrónica",
    type: "BANK_TRANSFER",
    isActive: true,
    isDefault: false,
    requiresAuth: false,
    processingFee: 0.005,
    feeType: "PERCENTAGE",
  },
  {
    id: "4",
    name: "Mercado Pago",
    description: "Billetera digital",
    type: "MERCADO_PAGO",
    isActive: true,
    isDefault: false,
    requiresAuth: true,
    processingFee: 0.045,
    feeType: "PERCENTAGE",
  },
];

export const IVA_CONDITIONS = [
  { id: "RESPONSABLE_INSCRIPTO", label: "Responsable Inscripto" },
  { id: "MONOTRIBUTO", label: "Monotributo" },
  { id: "EXENTO", label: "Exento" },
];

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
