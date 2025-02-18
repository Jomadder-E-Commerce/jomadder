import {  frontendApi } from "@/components/Redux/api/baseApi";

const cartApi = frontendApi.injectEndpoints({
  endpoints: (build) => ({
    postCart: build.mutation({
      query: (body) => ({
        url: `cart`,
        method: 'POST',
        body: body,
        headers: {
          Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    getCartList: build.query({
      query: () => ({
        url: `/cart`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),
    getCheckall: build.query({
      query: () => ({
        url: `/cart/checked`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),
    updateCheckbox: build.mutation({
      query: ({id, body}) => ({
        url: `/cart/item/${id}`,
        method: "PATCH",
        body: body,
       
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: build.mutation({
      query: (id) => ({
        url: `cart/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    UpdateQuantity: build.mutation({
      query: ( body ) => ({
        url: `cart/quantity`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteCartAll: build.mutation({
      query: () => ({
        url: `cart/reset`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { usePostCartMutation, useGetCartListQuery, useUpdateCheckboxMutation, useGetCheckallQuery, useDeleteCartMutation, useUpdateQuantityMutation, useDeleteCartAllMutation} = cartApi;
