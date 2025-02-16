import { baseApi } from "@/components/Redux/api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTransaction : build.query({
      query: () => ({
        url: `/transaction/admin/all`,
        method: "GET",
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
    getMyTransaction: build.query({
      query: () => ({
        url: `/transaction/my`,
        method: "GET",
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `Transaction/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
    updateTransaction: build.mutation({
      query: ({ id, body }) => ({
        url: `/transaction/update/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Transaction"],
    }),
    updateTransactionStatus: build.mutation({
      query: ({ id, body }) => ({
        url: `/transaction/status/${id}`,
        method: "PATCH",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
  overrideExisting: true,
});

export const {
 useGetAllTransactionQuery,
 useGetMyTransactionQuery,
 useUpdateTransactionMutation,
 useUpdateTransactionStatusMutation,
} = transactionApi;
