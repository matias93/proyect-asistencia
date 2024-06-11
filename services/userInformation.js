import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../databases/realtimeDatabase';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getDatosUser: builder.query({
      query: () => 'datosuser.json', // Asegúrate de que la URL termina con .json
      transformResponse: (response) => {
        console.log('Respuesta del API:', response);
        return response;
      },
    }),
    // Otros endpoints pueden ir aquí
  }),
});

export const { useGetDatosUserQuery } = userApi;