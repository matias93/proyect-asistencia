import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../databases/realtimeDatabase';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['profileImageGet', 'locationGet'],
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getDatosUser: builder.query({
      query: () => 'datosuser.json',
      transformResponse: (response) => {
        console.log('Respuesta del API:', response);
        return response;
      },
    }),
    
  }),
});

export const { useGetDatosUserQuery , useGetProfileImageQuery, usePostProfileImageMutation} = userApi;