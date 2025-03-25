import { backendApi } from "@/components/Redux/api/baseApi";

const productApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ category, page, size, price_start, price_end , sort }) => ({
        url: `/product/category/${category}`,
        method: "GET",
        params: {
          page,
          size,
          price_start,
          price_end,
          sort
        },
      }),
      providesTags: ['ProductList'],
    }),
    
    getSingleProduct: build.query({
      query: (id) => ({
        url: `product/single/${id}`,
        method: 'GET',
      }),
      providesTags: ['ProductList'],
    }),
    getSingleProductChiness: build.query({
      query: (id) => ({
        url: `product/chiness/single/${id}`,
        method: 'GET',
      }),
      providesTags: ['ProductList'],
    }),
    getProductsByShop: build.query({
      query: ({shopId, page, size, price_start, price_end,sort}) => ({
        url: `product/shop/${shopId}`,
        method: 'GET',
        params: {
          page,
          size,
          price_start,
          price_end,
          sort
        },
      }),
      providesTags: ['ProductList'],
    }),
    getShopInfo: build.query({
      query: (id) => ({
        url: `product/shopInfo/${id}`,
        method: 'GET',
      }),
      providesTags: ['ProductList'],
    }),
    getReviews: build.query({
      query: (id) => ({
        url: `product/reviews/${id}`,
        method: 'GET',
      }),
      providesTags: ['ProductList'],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery, useGetProductsByShopQuery, useGetShopInfoQuery, useGetSingleProductChinessQuery, useGetReviewsQuery } = productApi;
