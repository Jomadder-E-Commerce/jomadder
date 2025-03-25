import { backendApi } from "@/components/Redux/api/baseApi";

const contactApi = backendApi.injectEndpoints({
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

