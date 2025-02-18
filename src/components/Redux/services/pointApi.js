import { backendApi } from "@/components/Redux/api/baseApi";

const pointApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    getPoint: build.query({
      query: () => ({
        url: `/point`,
        method: 'GET',
      }),
      providesTags: ['Point'],
    }),
    postPoint: build.mutation({
      query: (body) => ({
        url: `/point/create`,
        method: 'POST',
        body: body,
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      invalidatesTags: ['Point'],
    }),
  }),
  overrideExisting: true,
});

export const {useGetPointQuery, usePostPointMutation} = pointApi;
