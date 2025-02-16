import { baseApi } from "@/components/Redux/api/baseApi";

const shipmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postShipment: build.mutation({
      query: (body) => ({
        url: `/shipment`,
        method: "POST",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Shipment"],
    }),
    getAllShipment: build.query({
      query: () => ({
        url: `/shipment/all`,
        method: "GET",
      }),
      providesTags: ["Shipment"],
    }),
    getShipmentProductList: build.query({
      query: () => ({
        url: `/shipment/name`,
        method: "GET",
      }),
      providesTags: ["Shipment"],
    }),
    getPricing: build.query({
      query: (product) => ({
        url: `/shipment/pricing/${product}`,
        method: "GET",
      }),
      providesTags: ["Shipment"],
    }),
    deletePricing: build.mutation({
      query: (product) => ({
        url: `/shipment/pricing/${product}`,
        method: "DELETE",
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Shipment"],
    }),
    updatePricing: build.mutation({
      query: ({ id, body }) => ({
        url: `/shipment/${id}`,
        method: "PATCH",
        body: body,
        headers: {
         Authorization: `Bearer ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : null}`,
        },
      }),
      invalidatesTags: ["Shipment"],
    }),
  }),
});

export const {
  useGetShipmentProductListQuery,
  useGetAllShipmentQuery,
  usePostShipmentMutation,
  useGetPricingQuery,
  useDeletePricingMutation,
  useUpdatePricingMutation,
} = shipmentApi;
