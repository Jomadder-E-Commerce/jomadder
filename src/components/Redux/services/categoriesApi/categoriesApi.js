import { baseApi, frontendApi } from "@/components/Redux/api/baseApi";

const categoriesApi = frontendApi.injectEndpoints({
    endpoints:(build)=>({
        getCategories: build.query({
            query: () => ({
              url: `category`,
              method: 'GET',
            }),
            providesTags: ['Category'],
          }),
          postCategories: build.mutation({
            query: (body) => ({
              url: `category`,
              method: 'POST',
              body: body,
            }),
            invalidatesTags: ['Category'],
          }),
          deleteCategories: build.mutation({
            query: ({ _id }) => ({
              url: `category/${_id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['Category']
          }),
          patchCategories: build.mutation({
            query: ({ id, body }) => ({
              url: `category/${id}`,
              method: 'PATCH',
              body: body,
            }),
            invalidatesTags: ['Category'],
          }),
    })
})
export const {usePostCategoriesMutation, useGetCategoriesQuery, usePatchCategoriesMutation, useDeleteCategoriesMutation}= categoriesApi