import { baseApi } from "@/components/Redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => ({
        url: `/dashboard`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {useGetDashboardQuery} = dashboardApi;
