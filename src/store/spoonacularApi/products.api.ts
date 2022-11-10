import { ProductsResponse, ProductInfo } from '../../types/ProductModels';
import { spooncularApi } from "./spooncular.api"

const productsApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchProducts: build.query<ProductsResponse, string>({
        query: (search:string) => ({
            url: 'food/products/search',
            params: {
                query: search,
                number: 10,  
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        }),
      }),
      getProductInfo: build.query<ProductInfo,string>({
        query: (search:string) => ({
            url: `food/products/${search}`,
            params:{
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        })
      })
    }),
  })
  
export const { useLazySearchProductsQuery, useLazyGetProductInfoQuery } = productsApi