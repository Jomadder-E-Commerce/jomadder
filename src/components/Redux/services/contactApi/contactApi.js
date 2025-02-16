import { baseApi,frontendApi } from "@/components/Redux/api/baseApi";

const contactApi = frontendApi.injectEndpoints({
  endpoints: (build) => ({
    postcontact: build.mutation({
      query: (body) => ({
        url: `/contact`,
        method: "POST",
        body: body,
      }),
      invalidatesTags:  ["contact"],
    }),
    
  }),
});
export const { usePostcontactMutation } = contactApi;

