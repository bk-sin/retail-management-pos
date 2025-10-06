import { PaymentMethod } from "@bksin/database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from "./payment-methods.types";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
  credentials: "include",
});

export const paymentMethodsApi = createApi({
  reducerPath: "paymentMethodsApi",
  baseQuery,
  tagTypes: ["PaymentMethod"],
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => "payment-methods",
      providesTags: ["PaymentMethod"],
    }),

    createPaymentMethod: builder.mutation<
      PaymentMethod,
      CreatePaymentMethodDto
    >({
      query: (newPaymentMethod) => ({
        url: "payment-methods",
        method: "POST",
        body: newPaymentMethod,
      }),
      invalidatesTags: ["PaymentMethod"],
    }),

    updatePaymentMethod: builder.mutation<
      PaymentMethod,
      { id: string; data: UpdatePaymentMethodDto }
    >({
      query: ({ id, data }) => ({
        url: `payment-methods/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PaymentMethod"],
    }),

    deletePaymentMethod: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `payment-methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useDeletePaymentMethodMutation,
} = paymentMethodsApi;
