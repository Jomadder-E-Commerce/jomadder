import { baseApi, frontendApi } from "@/components/Redux/api/baseApi";

const HomeBannerApi = frontendApi.injectEndpoints({
  endpoints: (build) => ({
    getToAllBanner: build.query({
      query: () => ({
        url: `/banner/all`,
        method: 'GET',
      }),
      providesTags:['Banner']
    }),
    getToBanner: build.query({
      query: () => ({
        url: `/banner/big/all`,
        method: 'GET',
      }),
      providesTags:['Banner']
    }),
    getToBannerAdmin: build.query({
      query: () => ({
        url: `/banner/big/admin`,
        method: 'GET',
      }),
      providesTags:['Banner']
    }),
    getTosideBanner: build.query({
      query: () => ({
        url: `/banner/small/all`,
        method: 'GET',
      }),
      providesTags:['Banner']
    }),
    getTosideBannerAdmin: build.query({
      query: () => ({
        url: `/banner/small/admin`,
        method: 'GET',
      }),
      providesTags:['Banner']
    }),
    addToBanner: build.mutation({
      query: (body) => ({
        url: '/banner/big',
        method: 'POST',
        body: body,
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Banner'],
    }),
    addTosideBanner: build.mutation({
      query: (body) => ({
        url: '/banner/small',
        method: 'POST',
        body: body,
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Banner'],
    }),
    removeToBanner: build.mutation({
      query: (itemId) => ({
        url: `/banner/big/delete/${itemId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Banner'],
    }),
    removeTosideBanner: build.mutation({
      query: (itemId) => ({
        url: `/banner/small/delete/${itemId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Banner'],
    }),
    updateToBanner: build.mutation({
      query: ({ id, body }) => ({
        url: `/banner/big/update/${id}`,
        method: 'PATCH',
        body: body,
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Banner'],
    }),
    updateTosideBanner: build.mutation({
      query: ({ id, body }) => ({
        url: `/banner/small/update/${id}`,
        method: 'PATCH',
        body: body,
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useGetToBannerQuery,
  useGetToBannerAdminQuery,
  useGetTosideBannerAdminQuery,
  useGetTosideBannerQuery,
  useAddToBannerMutation,
  useRemoveToBannerMutation,
  useAddTosideBannerMutation,
  useRemoveTosideBannerMutation,
  useUpdateToBannerMutation,
  useUpdateTosideBannerMutation,
  useGetToAllBannerQuery
} = HomeBannerApi;
