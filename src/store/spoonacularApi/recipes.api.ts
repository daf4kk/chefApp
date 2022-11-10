import { RandomRecipesResponse } from './../../types/RecipeModels';
import { RecipesResponse, RecipeInfo } from '../../types/RecipeModels';
import { spooncularApi } from "./spooncular.api"

const recipesApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchRecipes: build.query<RecipesResponse, string>({
        query: (search:string) => ({
            url: 'recipes/complexSearch',
            params: {
                query: search,
                number: 10,  
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        }),
      }),
      getRandomRecipes: build.query<RandomRecipesResponse, string>({
        query: (q:string) => ({
          url: 'recipes/random',
          params: {
            number: 10,
            apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
          }
        })
      }),
      getRecipeInfo: build.query<RecipeInfo,string>({
        query: (search:string) => ({
            url: `recipes/${search}/information`,
            params:{
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        })
      })
    }),
  })
  
  export const { useLazySearchRecipesQuery, useLazyGetRecipeInfoQuery, useGetRandomRecipesQuery } = recipesApi