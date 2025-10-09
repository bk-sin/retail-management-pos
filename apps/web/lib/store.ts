import { taxesApi } from "@/features/taxes/taxes.api";
import onboardingReducer from "@/features/onboarding/onboarding.slice";
import { configureStore } from "@reduxjs/toolkit";
import { paymentMethodsApi } from "@/features/payment-methods/payment-methods.api";
import { businessApi } from "@/features/business/business.api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [taxesApi.reducerPath]: taxesApi.reducer,
      [paymentMethodsApi.reducerPath]: paymentMethodsApi.reducer,
      [businessApi.reducerPath]: businessApi.reducer,
      onboarding: onboardingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        taxesApi.middleware,
        paymentMethodsApi.middleware,
        businessApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
