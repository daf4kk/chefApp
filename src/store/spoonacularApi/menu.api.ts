import { MenuQuery } from '../../types/CommonModels';
import { MenuItem, MenuResponse } from './../../types/MenuModels';
import { spooncularApi } from "./spooncular.api"
import { KEY } from './spooncular.api';
const menuApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchMenu: build.query<MenuResponse, MenuQuery>({
        query: (search:MenuQuery) => ({
            url: 'food/menuItems/search',
            params: {
                query: search.query,
                number: 10,  
                apiKey: KEY
            }
        }),
      }),
      getMenuInfo: build.query<MenuItem,number>({
        query: (id:number) => ({
            url: `food/menuItems/${id}`,
            params:{
                apiKey: KEY
            }
        })
      })
    }),
  })
  
  export const {useLazySearchMenuQuery, useLazyGetMenuInfoQuery} = menuApi