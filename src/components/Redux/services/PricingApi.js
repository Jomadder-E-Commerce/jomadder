import { backendApi } from "@/components/Redux/api/baseApi";

const PricingApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPricing: build.query({
      query: () => ({
        url: `/pricing`,
        method: "GET",
      }),
      providesTags: ["Pricing"],
    }),
    postPricing: build.mutation({
      query: (body) => ({
        url: `/pricing`,
        method: "POST",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Pricing"],
    }),
    deletePricing: build.mutation({
      query: (limit) => ({
        url: `/pricing/${limit}`,
        method: "DELETE",
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Pricing"],
    }),
    updatePricing: build.mutation({
      query: ({ limit, body }) => ({
        url: `/pricing/${limit}`,
        method: "PATCH",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Pricing"],
    }),
  }),
});

export const {
  useGetAllPricingQuery,
  usePostPricingMutation,
  useDeletePricingMutation,
  useUpdatePricingMutation,
} = PricingApi;
