import { IngredientResponse, IngredientInfo } from '../../types/IngredientModels';
import { IngredientQuery } from '../../types/CommonModels';
import { spooncularApi } from "./spooncular.api"
import { KEY } from './spooncular.api';
const ingredientsApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchIngredients: build.query<IngredientResponse, IngredientQuery>({
        query: (search:IngredientQuery) => ({
            url: `food/ingredients/search?${search.params.minProteinPercent && `minProteinPercent=${search.params.minProteinPercent}`}&${search.params.maxProteinPercent && `maxProteinPercent=${search.params.maxProteinPercent}`}&${search.params.minFatPercent && `minFatPercent=${search.params.minFatPercent}`}&${search.params.maxFatPercent && `maxFatPercent=${search.params.maxFatPercent}`}&${search.params.minCarbsPercent && `minCarbsPercent=${search.params.minCarbsPercent}`}&${search.params.maxCarbsPercent && `maxCarbsPercent=${search.params.maxCarbsPercent}`}&${search.params.intolerances && `intolerances=${search.params.intolerances}`}`,
            params: {
                query: search.query,
                number: 10,  
                apiKey: KEY
            }
        }),
      }),
      getIngredientInfo: build.query<IngredientInfo,number>({
        query: (id:number) => ({
            url: `food/ingredients/${id}/information?amount=1`,
            params:{
                apiKey: KEY
            }
        })
      })
    }),
  })
  
export const { useLazySearchIngredientsQuery, useLazyGetIngredientInfoQuery } = ingredientsApi