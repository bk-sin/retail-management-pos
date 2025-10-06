import { Tax } from "@bksin/database";
import { CreateTaxDto, UpdateTaxDto } from "./tax.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
  credentials: "include",
});

export const taxesApi = createApi({
  reducerPath: "taxesApi",
  baseQuery,
  tagTypes: ["Tax"],
  endpoints: (builder) => ({
    getTaxes: builder.query<Tax[], void>({
      query: () => "taxes",
      providesTags: ["Tax"],
    }),

    createTax: builder.mutation<Tax, CreateTaxDto>({
      query: (newTax) => ({
        url: "taxes",
        method: "POST",
        body: newTax,
      }),
      invalidatesTags: ["Tax"],
    }),

    updateTax: builder.mutation<Tax, { id: string; data: UpdateTaxDto }>({
      query: ({ id, data }) => ({
        url: `taxes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tax"],
    }),

    deleteTax: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `taxes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tax"],
    }),
  }),
});

export const {
  useGetTaxesQuery,
  useCreateTaxMutation,
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} = taxesApi;
