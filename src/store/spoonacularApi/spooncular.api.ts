import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//Желательно менять на свой
export const KEY = '3adbea4e8e3347a9a2fb6cbb5f913a5f'
// export const KEY = 'ad59bcba1ad145c4be308352c4ea8549';
//dafu4k@mail.ru

export const spooncularApi = createApi({
    reducerPath: 'spooncular/api',  
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spoonacular.com/'
    }),
    endpoints: () => ({})
})
