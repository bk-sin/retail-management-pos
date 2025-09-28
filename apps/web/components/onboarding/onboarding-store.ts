import { OnboardingFormData } from "@/schemas/onboarding-schema";
import { create } from "zustand";

const getDefaultData = (): OnboardingFormData => ({
  legalName: "",
  cuit: "",
  ivaCondition: "RESPONSABLE_INSCRIPTO",
  address: "",
  phone: "",
  email: "",
  selectedTaxes: ["1"],
  selectedPaymentMethods: ["1"],
});

interface OnboardingState {
  currentStep: number;
  data: OnboardingFormData;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (newData: Partial<OnboardingFormData>) => void;
  goToStep: (step: number) => void;
}

const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  data: getDefaultData(),
  setCurrentStep: (step: number) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  goToStep: (step) => set({ currentStep: step }),

  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
}));
export default useOnboardingStore;
