import { backendApi } from "@/components/Redux/api/baseApi";

const translationApi = backendApi.injectEndpoints({
    endpoints: (build) => ({
        getTranslatedText: build.mutation({
            query: (body) => ({
                url: `/translation`,
                method: "POST",
                body: body,
                headers: {
                    "Ocp-Apim-Subscription-Key": "Ao7CLWU7VNiKx9CJkrVFTLPcvGeTnQa1EGi7XlqdKR1zoC4BXZe7JQQJ99AKACqBBLyXJ3w3AAAbACOGnmVK",
                    "Ocp-Apim-Subscription-Region": "southeastasia"
                },
            }),
            invalidatesTags: ["translation"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTranslatedTextMutation
} = translationApi;
