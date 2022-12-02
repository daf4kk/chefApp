import { RandomRecipesResponse, RecipeInstruction, Step } from './../../types/RecipeModels';
import { RecipesResponse, RecipeInfo } from '../../types/RecipeModels';
import { spooncularApi } from "./spooncular.api"
import { RecipeQuery } from '../../types/CommonModels';

const recipesApi = spooncularApi.injectEndpoints({
    endpoints: (build) => ({
      searchRecipes: build.query<RecipesResponse, RecipeQuery>({
        query: (search:RecipeQuery) => ({
            url: `recipes/complexSearch?${search.params.diet && `diet=${search.params.diet}`}&${search.params.type && `type=${search.params.type}&${search.params.maxReadyTime && `maxReadyTime=${search.params.maxReadyTime}`}`}`,
            // url: 'recipes/complexSearch',
            params: {
                query: search.query,
                // diet: search.params.diet,
                // type: search.params.type,
                // maxReadyTime: search.params.maxReadyTime,
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
      getRecipesByFilter: build.query<RecipesResponse, RecipeQuery>({
        query: (query:RecipeQuery) => ({
          url: 'recipes/complexSearch?diet=vegetarian,gluten free',
          params: {
            query: query.query,
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
      }), getRecipeInstruction: build.query<RecipeInstruction,number>({
        query: (recipeId:number) => ({
          url: `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
          params: {
            apiKey: 'ad59bcba1ad145c4be308352c4ea8549'
          }
        }),
        transformResponse: (response: RecipeInstruction[]) => response[0]
      })
    }),
    
  })
  
  export const { useLazySearchRecipesQuery, useLazyGetRecipeInfoQuery, useGetRandomRecipesQuery, useLazyGetRecipeInstructionQuery, useLazyGetRecipesByFilterQuery } = recipesApi