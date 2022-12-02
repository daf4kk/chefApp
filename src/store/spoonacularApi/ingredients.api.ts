import { IngredientResponse, IngredientInfo } from '../../types/IngredientModels';
import { IngredientQuery } from '../../types/CommonModels';
import { spooncularApi } from "./spooncular.api"

const ingredientsApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchIngredients: build.query<IngredientResponse, IngredientQuery>({
        query: (search:IngredientQuery) => ({
            url: `food/ingredients/search?${search.params.minProteinPercent && `minProteinPercent=${search.params.minProteinPercent}`}&${search.params.maxProteinPercent && `maxProteinPercent=${search.params.maxProteinPercent}`}&${search.params.minFatPercent && `minFatPercent=${search.params.minFatPercent}`}&${search.params.maxFatPercent && `maxFatPercent=${search.params.maxFatPercent}`}&${search.params.minCarbsPercent && `minCarbsPercent=${search.params.minCarbsPercent}`}&${search.params.maxCarbsPercent && `maxCarbsPercent=${search.params.maxCarbsPercent}`}&${search.params.intolerances && `intolerances=${search.params.intolerances}`}`,
            params: {
                query: search.query,
                number: 10,  
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        }),
      }),
      getIngredientInfo: build.query<IngredientInfo,string>({
        query: (search:string) => ({
            url: `food/products/${search}`,
            params:{
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        })
      })
    }),
  })
  
export const { useLazySearchIngredientsQuery, useLazyGetIngredientInfoQuery } = ingredientsApi