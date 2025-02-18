import { backendApi } from "@/components/Redux/api/baseApi";

const depositeApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    postdeposite: build.mutation({
      query: (body) => ({
        url: `/deposit/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags:  ["deposit"],
      headers: {
        Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
      },
    }),
    updateStatus: build.mutation({
      query: ({id, body}) => ({
        url: `/deposit/status/${id}`,
        method: "PATCH",
        body: body,
        headers: {
          Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["deposit"],
    }),
    
    tryDeposit: build.mutation({
        query: ({orderId}) => ({
          url: `/deposit/use/${orderId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
        }),
        invalidatesTags: ["deposit"],
      }),
    getAlldeposite: build.query({
      query: () => ({
        url: `/deposite/all`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["deposit"],
    }),
    getMydepsit: build.query({
      query: (id) => ({
        url: `/deposit/mydeposit`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      providesTags: ["deposit"],
    }),
  }),
});
export const { usePostdepositeMutation, useUpdateStatusMutation,useTryDepositMutation, useGetMydepsitQuery } = depositeApi;

