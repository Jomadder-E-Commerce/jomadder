import { baseApi } from "@/components/Redux/api/baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSupport: build.query({
      query: () => ({
        url: `/support/admin`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      providesTags: ['Support'],
    }),
    getUserSupport: build.query({
      query: () => ({
        url: `/support`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      providesTags: ['Support'],
    }),
    getSingleSupport: build.query({
      query: (id) => ({
        url: `/support/single/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
    }),
    updateSingleSupport: build.mutation({
      query: (body) => ({
        url: `/support/${body?.id}`,
        method: 'PATCH',
        body: body,
        headers: {
          Authorization: `Bearer ${ typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Support'],
    }),
    createSupport: build.mutation({
      query: (body) => ({
        url: `/support`,
        method: "POST",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Support"],
    }),
  }),
});

export const { useGetSupportQuery ,useGetUserSupportQuery, useGetSingleSupportQuery, useUpdateSingleSupportMutation, useCreateSupportMutation } = supportApi;
