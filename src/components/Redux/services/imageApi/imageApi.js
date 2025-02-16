import { baseApi } from "@/components/Redux/api/baseApi";

const ImageApi = baseApi.injectEndpoints({
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
        }),
      }),
  }),
});
export const { useConvertImageMutation,useFindProductByImageMutation} = ImageApi;
