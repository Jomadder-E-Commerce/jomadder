import { backendApi } from "@/components/Redux/api/baseApi";

const ImageApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    convertImage: build.mutation({
      query: (payload) => ({
        url: `/image/conversation`,
        method: "POST",
        body: payload,
      }),
    }),
    findProductByImage: build.mutation({
      query: (payload) => ({
        url: `/image/searchByImage`,
        method: "POST",
        body: payload,
        headers: {
          'Accept': 'application/json',
          "Expect": "",
        },
      }),
    }),
    getProductsByImageUri: build.query({
      query: ({ image_uri, query }) => {
        const modifiedQuery = { ...query };

        if (modifiedQuery?.price_start) {
          modifiedQuery.price_start = modifiedQuery.price_start / 17;
        }
        if (modifiedQuery?.price_end) {
          modifiedQuery.price_end = modifiedQuery.price_end / 17;
        }
        return {
          url: `/image/getByImageUri`,
          method: "GET",
          params: {
            image_uri,
            ...modifiedQuery
          },
        }
      },
    })
  }),
});
export const { useConvertImageMutation, useFindProductByImageMutation, useGetProductsByImageUriQuery } = ImageApi;
