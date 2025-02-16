import { baseApi,frontendApi } from "@/components/Redux/api/baseApi";

const checkoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postcheckout: build.mutation({
      query: (body) => ({
        url: `/checkout`,
        method: "POST",
        body: body,
      }),
      invalidatesTags:  ["Checkout"],
      headers: {
        Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
      },
    }),
    updateStatus: build.mutation({
      query: ({id, body}) => ({
        url: `/checkout/status/${id}`,
        method: "PATCH",
        body: body,
        headers: {
          Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Checkout"],
    }),
    
    getCheckout: build.query({
      query: () => ({
        url: `/checkout`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["Checkout"],
    }),
    getAllCheckout: build.query({
      query: () => ({
        url: `/checkout/all`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["Checkout"],
    }),
    getProductDetails: build.query({
      query: (id) => ({
        url: `/checkout/details/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["Checkout"],
    }),
    
  }),
});
export const { usePostcheckoutMutation,useUpdateStatusMutation, useGetCheckoutQuery, useGetAllCheckoutQuery, useGetProductDetailsQuery } = checkoutApi;

