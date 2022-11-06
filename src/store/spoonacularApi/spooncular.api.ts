import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const spooncularApi = createApi({
    reducerPath: 'spooncular/api',  
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spoonacular.com/'
    }),
    endpoints: () => ({})
})
