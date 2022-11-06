import { RecipesResponse, RecipeInfo } from '../../types/RecipeModels';
import { spooncularApi } from "./spooncular.api"

const recipesApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchRecipes: build.query<RecipesResponse, string>({
        query: (search:string) => ({
            url: 'recipes/complexSearch',
            params: {
                query: search,
                number: 5,  
                apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
            }
        }),
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
  
  export const { useSearchRecipesQuery, useLazyGetRecipeInfoQuery } = recipesApi