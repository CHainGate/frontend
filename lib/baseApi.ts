// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from './store';

const dynamicBaseQuery: BaseQueryFn <string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  WebApi,
  extraOptions) => {
    const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT == "dev"
      ? "http://localhost:8000/api/config/"
      : "http://localhost/backend/api/config/";
    const rawBaseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).authInfo.token ? localStorage.getItem('token') : null
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      }
    });
    return rawBaseQuery(args, WebApi, extraOptions);
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const chaingateApi = createApi({
  baseQuery: dynamicBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: () => ({}),
})

