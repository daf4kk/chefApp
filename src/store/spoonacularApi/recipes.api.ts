import { RandomRecipesResponse, RecipeInstruction} from './../../types/RecipeModels';
import { RecipesResponse, RecipeInfo } from '../../types/RecipeModels';
import { spooncularApi } from "./spooncular.api"
import { RecipeQuery } from '../../types/CommonModels';
import { KEY } from './spooncular.api';
const recipesApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchRecipes: build.query<RecipesResponse, RecipeQuery>({
        query: (search:RecipeQuery) => ({
            url: `recipes/complexSearch?${search.params.diet && `diet=${search.params.diet}`}&${search.params.type && `type=${search.params.type}&${search.params.maxReadyTime && `maxReadyTime=${search.params.maxReadyTime}`}`}`,
            params: {
                query: search.query,
                number: 10,  
                apiKey: KEY
            }
        }),
      }),
      getRandomRecipes: build.query<RandomRecipesResponse, string>({
        query: (q:string) => ({
          url: 'recipes/random',
          params: {
            number: 10,
            tags: q,
            apiKey: KEY
          }
        })
      }),
      getRecipesByFilter: build.query<RecipesResponse, RecipeQuery>({
        query: (query:RecipeQuery) => ({
          url: 'recipes/complexSearch?diet=vegetarian,gluten free',
          params: {
            query: query.query,
            number: 10,  
            apiKey: KEY
        }
        })
      }),
      getRecipeInfo: build.query<RecipeInfo,string>({
        query: (search:string) => ({
            url: `recipes/${search}/information`,
            params:{
                apiKey: KEY
            }
        })
      }), getRecipeInstruction: build.query<RecipeInstruction,number>({
        query: (recipeId:number) => ({
          url: `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
          params: {
            apiKey: KEY
          }
        }),
        transformResponse: (response: RecipeInstruction[]) => response[0]
      })
    }),
    
  })
  
  export const { useLazySearchRecipesQuery, useLazyGetRecipeInfoQuery, useLazyGetRandomRecipesQuery, useLazyGetRecipeInstructionQuery, useLazyGetRecipesByFilterQuery } = recipesApi