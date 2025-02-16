import { baseApi } from "@/components/Redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postCoupon: build.mutation({
      query: (body) => ({
        url: `coupon`,
        method: 'POST',
        body: body,
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      invalidatesTags: ['Coupon'],
    }),
    tryCoupon: build.mutation({
      query: (code) => ({
        url: `/coupon/use/${code}`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
    }),
    getCoupon: build.query({
      query: () => ({
        url: `/coupon`,
        method: 'GET',
      }),
      providesTags: ['Coupon'],
    }),
    getSingleCoupon: build.query({
      query: (id) => ({
        url: `/coupon/get/${id}`,
        method: 'GET',
      }),
      providesTags: ['Coupon'],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `coupon/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
    updateCoupon: build.mutation({
      query: ({id, body }) => ({
        url: `coupon/update/${id}`,
        method: 'PATCH',
        body: body,
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
          },
      }),
      invalidatesTags: ['Coupon'],
    }),
  }),
  overrideExisting: true,
});

export const {usePostCouponMutation, useGetCouponQuery,useGetSingleCouponQuery, useDeleteCouponMutation, useUpdateCouponMutation , useTryCouponMutation} = couponApi;
