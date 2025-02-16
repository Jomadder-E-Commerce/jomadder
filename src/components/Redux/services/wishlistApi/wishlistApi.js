import { frontendApi } from "@/components/Redux/api/baseApi";

const wishlistApi = frontendApi.injectEndpoints({
    endpoints:(build)=>({
        postWishlist: build.mutation({
            query: (body) => ({
                url: `wishlist`,
                method: 'POST',
                body:body
              }),
              invalidatesTags: ['Wishlist'],
        }),
        getwhishList: build.query({
            query: () => ({
              url: `/wishlist`,
              method: 'GET',
            }),
            providesTags: ['Wishlist'],
          }),
          deleteWhishlistSingle: build.mutation({
            query: ({id}) => ({
              url: `wishlist/single/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
          }),
          deleteWhishlistAll: build.mutation({
            query: () => ({
              url: `wishlist/reset`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
          }),
    })
})
export const { usePostWishlistMutation, useDeleteWhishlistAllMutation, useDeleteWhishlistSingleMutation, useGetwhishListQuery}=wishlistApi