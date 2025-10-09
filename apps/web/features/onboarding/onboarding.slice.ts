import { OnboardingFormData } from "@/schemas/onboarding-schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { IvaCondition } from "@bksin/database";

const getDefaultData = (): OnboardingFormData => ({
  legalName: "",
  cuit: "",
  ivaCondition: IvaCondition.RESPONSABLE_INSCRIPTO,
  name: null,
  address: null,
  city: null,
  province: null,
  postalCode: null,
  phone: "",
  email: "",
  website: "",
  selectedTaxes: [],
  selectedPaymentMethods: [],
});

export interface OnboardingState {
  currentStep: number;
  data: OnboardingFormData;
}

const initialState: OnboardingState = {
  currentStep: 0,
  data: getDefaultData(),
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateData: (state, action: PayloadAction<Partial<OnboardingFormData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetOnboarding: (state) => {
      state.currentStep = 0;
      state.data = getDefaultData();
    },
  },
});

export const { nextStep, prevStep, goToStep, updateData, resetOnboarding } =
  onboardingSlice.actions;

export const onboardingSelector = (state: RootState) => state.onboarding;

export default onboardingSlice.reducer;
