import { backendApi } from "@/components/Redux/api/baseApi";

const userApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    getUserList: build.query({
      query: () => ({
        url: `/user/list`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      providesTags: ['User'],
    }),
    getUserDashboard: build.query({
      query: () => ({
        url: `/user/dashboard`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      providesTags: ['User'],
    }),
    updateRole: build.mutation({
      query: ({ body }) => ({
        url: `/user/role`,
        method: "PATCH",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {useGetUserListQuery ,useGetUserDashboardQuery, useUpdateRoleMutation} = userApi;
