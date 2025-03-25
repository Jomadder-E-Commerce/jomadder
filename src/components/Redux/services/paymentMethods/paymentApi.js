import { backendApi } from "@/components/Redux/api/baseApi";

const paymentApi = backendApi.injectEndpoints({
    endpoints:(build)=>({
        getpayment: build.query({
            query: () => ({
              url: `/payMethod`,
              method: 'GET',
            }),
            providesTags: ['payMethod'],
          }),
          postPayment: build.mutation({
            query: (body) => ({
                url: `/payMethod`,
                method: 'POST',
                body:body
              }),
              invalidatesTags: ['payMethod'],
        }),
          UpdatePayment: build.mutation({
            query: ({body, id}) => ({
                url: `/payMethod/${id}`,
                method: 'PATCH',
                body:body
              }),
              invalidatesTags: ['payMethod'],
        }),
        deletePayment: build.mutation({
          query: ({id}) => ({
            url: `payMethod/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['payMethod'],
        }),
    })
})
export const { useGetpaymentQuery, usePostPaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation}=paymentApi