import { frontendApi } from "@/components/Redux/api/baseApi";

const productApi = frontendApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ category, page, size, price_start, price_end }) => ({
        url: `/product/category/${category}`,
        method: "GET",
        params: {
          page,
          size,
          price_start,
          price_end,
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
      query: (id) => ({
        url: `product/shop/${id}`,
        method: 'GET',
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
