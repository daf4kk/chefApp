import { MenuItem, MenuResponse } from './../../types/MenuModels';

import { spooncularApi } from "./spooncular.api"

const menuApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchMenu: build.query<MenuResponse, string>({
        query: (search:string) => ({
            url: `food/menuItems/search`,
            params: {
                query: search,
                number: 5,  
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        }),
      }),
      getMenuInfo: build.query<MenuItem,string>({
        query: (search:string) => ({
            url: `food/menuItems/${search}`,
            params:{
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        })
      })
    }),
  })
  
  export const {useSearchMenuQuery, useGetMenuInfoQuery} = menuApi