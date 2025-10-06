import { taxesApi } from "@/features/taxes/taxes.api";
import onboardingReducer from "@/features/onboarding/onboardingSlice";
import { configureStore } from "@reduxjs/toolkit";
import { paymentMethodsApi } from "@/features/payment-methods/payment-methods.api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [taxesApi.reducerPath]: taxesApi.reducer,
      [paymentMethodsApi.reducerPath]: paymentMethodsApi.reducer,
      onboarding: onboardingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        taxesApi.middleware,
        paymentMethodsApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
