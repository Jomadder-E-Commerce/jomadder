import { getCookie } from '@/components/shared/LocalStorage/LocalStorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../features/AllSlice/authSlice';
import { preset_api_v1 } from '@/app/control_version_api';


// api 
const BASE_URL_FRONTEND = process.env.NEXT_PUBLIC_MEDIA_API + preset_api_v1;
const BASE_URL_BACKEND = process.env.NEXT_PUBLIC_BASE_API + preset_api_v1;


// baseQuery instance
const frontendBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_FRONTEND,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const backendBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_BACKEND,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithReauthFrontend = async (args, api, extraOptions) => {
  return baseQueryWithReauthHelper(args, api, extraOptions, frontendBaseQuery);
};

const baseQueryWithReauthBackend = async (args, api, extraOptions) => {
  return baseQueryWithReauthHelper(args, api, extraOptions, backendBaseQuery);
};

// Helper function
const baseQueryWithReauthHelper = async (args, api, extraOptions, baseQuery) => {
  const state = api.getState();
  const token = state.auth.token;

  if (!token) {
    return baseQuery(args, api, extraOptions);
  }

  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500) {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      try {
        const refreshTokenResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "GET",
            headers: { token: refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshTokenResult?.data) {
          const newToken = refreshTokenResult.data.data.accessToken;
          api.dispatch(setCredentials({ token: newToken }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error('Failed to refresh token, please login again.');
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
      }
    }
  }

  return result;
};




// frontend api








// will be deleted

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'https://parcel-backend-ebon.vercel.app/api/v1',
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`)
//     }
//     return headers
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   const state = api.getState();
//   const token = state.auth.token;
//   if (!token) {
//     return baseQuery(args, api, extraOptions);
//   }
//   let result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 500) {
//    const refreshToken = getCookie("refreshToken");
//     if (refreshToken) {
//       try {
//         const refreshTokenResult = await baseQuery({
//           url: "/auth/refresh-token",
//           method: "GET",
//           headers: { "token": refreshToken },
//         }, api, extraOptions);

//         if (refreshTokenResult?.data) {
//           const newToken = refreshTokenResult.data.data.accessToken;
//           api.dispatch(setCredentials({ token: newToken }));
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           toast.error('Failed to refresh token, please login');
//         }
//       } catch (error) {
//         console.error('Error during token refresh:', error);
//       }
//     }
//   }

//   return result;
// };


// export const baseApi = createApi({
//   reducerPath: 'baseApi', 
//   baseQuery:baseQueryWithReauth,
//   tagTypes: ["Wishlist", "Banner", 'ProductList', 'Cart', 'Category', 'Coupon', 'Transaction', 'translation', 'Checkout', 'Point', 'Shipment', 'Support', 'User', 'Pricing','deposit'],
//   endpoints: () => ({}),
// });


export const frontendApi = createApi({
  reducerPath: 'frontendApi',
  baseQuery: baseQueryWithReauthFrontend,
  tagTypes: ["Wishlist", "Banner", 'ProductList', 'Cart', 'Category', 'Coupon', 'Transaction', 'translation', 'Checkout', 'Point', 'Shipment', 'Support', 'User', 'Pricing','deposit'],
  endpoints: () => ({}),
});

// backend api

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: baseQueryWithReauthBackend,
  tagTypes: ["Wishlist", "Banner", 'ProductList', 'Cart', 'Category', 'Coupon', 'Transaction', 'translation', 'Checkout', 'Point', 'Shipment', 'Support', 'User', 'Pricing','deposit'],
  endpoints: () => ({}),
});