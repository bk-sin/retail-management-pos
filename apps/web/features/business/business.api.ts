import { CompanyConfig } from "@bksin/database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateCompanyConfigDto,
  UpdateCompanyConfigDto,
} from "./business.types";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
  credentials: "include",
});

export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery,
  tagTypes: ["Business"],
  endpoints: (builder) => ({
    getCompanyConfig: builder.query<CompanyConfig[], void>({
      query: () => "business",
      providesTags: ["Business"],
    }),

    createCompanyConfig: builder.mutation<
      CompanyConfig,
      CreateCompanyConfigDto
    >({
      query: (newBusiness) => ({
        url: "business",
        method: "POST",
        body: newBusiness,
      }),
      invalidatesTags: ["Business"],
    }),

    updateCompanyConfig: builder.mutation<
      CompanyConfig,
      { id: string; data: UpdateCompanyConfigDto }
    >({
      query: ({ id, data }) => ({
        url: `business/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),

    deleteCompanyConfig: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `business/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Business"],
    }),
  }),
});

export const {
  useGetCompanyConfigQuery,
  useCreateCompanyConfigMutation,
  useUpdateCompanyConfigMutation,
  useDeleteCompanyConfigMutation,
} = businessApi;
